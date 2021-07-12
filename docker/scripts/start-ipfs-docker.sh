#!/bin/sh

# From: https://github.com/Kubuxu/go-ipfs-swarm-key-gen
echo "/key/swarm/psk/1.0.0/" >> $IPFS_PATH/swarm.key;
echo "/base16/" >> $IPFS_PATH/swarm.key;
echo "8f3c4797f49dfc370e4fef35e5e6a32e43babec92861654e7d02c416e54631db" >> $IPFS_PATH/swarm.key;
# Init
ipfs init;
# Allow docker connection, cors and small disk space
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001;
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8080;
ipfs config Datastore.StorageMax 1GB;
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://0.0.0.0:5001", "http://127.0.0.1:5001", "https://webui.ipfs.io"]';
# Prepare the boot nodes
ipfs bootstrap rm --all;
BOOTNODESARR=$(echo $BOOTNODES|tr "," "\\n"|grep -v -e '^$');
for B in $BOOTNODESARR; do ipfs bootstrap add $B; done;
# Level set to info that can be chacked with curl http://localhost:5001/logs or ipfs log tail
export IPFS_LOGGING=info
# Run if PeerId and PrivKey are not present
if [ -z "$PEERID" ] && [ -z "$PRIVKEY" ]; then
	echo NewKeys;
	ipfs daemon;
	exit;
fi;
# Inject the custom keys
cat $IPFS_PATH/config | jq '.Identity.PeerID = "'$PEERID'" | .Identity.PrivKey = "'$PRIVKEY'" ' > config_new; mv config_new $IPFS_PATH/config;
echo PredefinedKeys;
echo $PEERID;
# Run if PeerId and PrivKey are present
ipfs daemon;
exit;
