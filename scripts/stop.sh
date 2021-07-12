#!/bin/sh
# RUN STOP:
# ./scripts/stop.sh [all]
# Where the argument is optional
# OR STOP INDIVIDUAL PERSONA:
# ./scripts/stop.sh [cust] [am] [lab] [amlab]

ARG1=$1;
ARG2=$2;
ARG3=$3;
ARG4=$4;
PROJECT="vitalam_demo";
ENVPATH=".env"
COMMONENVPATH="docker/docker.env";
CUSTPATH="docker/docker-compose-cust.yml";
AMPATH="docker/docker-compose-am.yml";
LABPATH="docker/docker-compose-lab.yml";
AMLABPATH="docker/docker-compose-am-lab.yml";

assert_env() {
	echo AssertEnv;
	trap 'rm -f "$COMBINEDENVPATH"' EXIT;
	COMBINEDENVPATH=$(mktemp);
	cat $ENVPATH $COMMONENVPATH > $COMBINEDENVPATH;
}

stop_all() {
	echo StopAll;
	docker-compose -p $PROJECT -f $CUSTPATH --env-file $COMBINEDENVPATH down --remove-orphans;
	docker-compose -p $PROJECT -f $AMPATH --env-file $COMBINEDENVPATH down --remove-orphans;
	docker-compose -p $PROJECT -f $LABPATH --env-file $COMBINEDENVPATH down --remove-orphans;
	docker-compose -p $PROJECT -f $AMLABPATH --env-file $COMBINEDENVPATH down --remove-orphans;
}

stop_cust() {
	echo StopCust;
	docker-compose -p $PROJECT -f $CUSTPATH --env-file $COMBINEDENVPATH down;
}

stop_am() {
	echo StopAM;
	docker-compose -p $PROJECT -f $AMPATH --env-file $COMBINEDENVPATH down;
}

stop_lab() {
	echo StopLab;
	docker-compose -p $PROJECT -f $LABPATH --env-file $COMBINEDENVPATH down;
}

stop_am_lab() {
	echo StopAMLab;
	docker-compose -p $PROJECT -f $AMLABPATH --env-file $COMBINEDENVPATH down;
}

assert_env;
if [ "$ARG1" == "all" ] || \
[ "$ARG1" == "" ]; then

	stop_all;

else

	if [ "$ARG1" == "cust" ] || \
	[ "$ARG2" == "cust" ] || \
	[ "$ARG3" == "cust" ] || \
	[ "$ARG4" == "cust" ]; then stop_cust; fi;

	if [ "$ARG1" == "am" ] || \
	[ "$ARG2" == "am" ] || \
	[ "$ARG3" == "am" ] || \
	[ "$ARG4" == "am" ]; then stop_am; fi;

	if [ "$ARG1" == "lab" ] || \
	[ "$ARG2" == "lab" ] || \
	[ "$ARG3" == "lab" ] || \
	[ "$ARG4" == "lab" ]; then stop_lab; fi;

	if [ "$ARG1" == "amlab" ] || \
	[ "$ARG2" == "amlab" ] || \
	[ "$ARG3" == "amlab" ] || \
	[ "$ARG4" == "amlab" ]; then stop_am_lab; fi;

fi;
