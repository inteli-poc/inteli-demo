#!/bin/sh
# RUN BUILD DEFAULT (brings up cust, am, lab):
# ./scripts/build.sh
# RUN BUILD ALL:
# ./scripts/build.sh [all]
# Where the argument is optional
# OR RUN BUILD OF INDIVIDUAL PERSONA:
# ./scripts/build.sh [cust] [am] [lab] [amlab]
# Where all three arguments are optional but minimum two should be present

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

build_cust() {
	echo BuildCust;
	docker-compose -p $PROJECT -f $CUSTPATH --env-file $COMBINEDENVPATH build;
}

build_am() {
	echo BuildAM;
	docker-compose -p $PROJECT -f $AMPATH --env-file $COMBINEDENVPATH build;
}

build_lab() {
	echo BuildLab;
	docker-compose -p $PROJECT -f $LABPATH --env-file $COMBINEDENVPATH build;
}

build_am_lab() {
	echo BuildAMLab;
	docker-compose -p $PROJECT -f $AMLABPATH --env-file $COMBINEDENVPATH build;
}

assert_env;
if [ "$ARG1" == "all" ] || \
  [ "$ARG1" == "" ]; then

	build_cust; build_am; build_lab; build_am_lab;

else

	if [ "$ARG1" == "cust" ] || \
	[ "$ARG2" == "cust" ] || \
	[ "$ARG3" == "cust" ] || \
	[ "$ARG4" == "cust" ]; then build_cust; fi;

	if [ "$ARG1" == "am" ] || \
	[ "$ARG2" == "am" ] || \
	[ "$ARG3" == "am" ] || \
	[ "$ARG4" == "am" ]; then build_am; fi;

	if [ "$ARG1" == "lab" ] || \
	[ "$ARG2" == "lab" ] || \
	[ "$ARG3" == "lab" ] || \
	[ "$ARG4" == "lab" ]; then build_lab; fi;

	if [ "$ARG1" == "amlab" ] || \
	[ "$ARG2" == "amlab" ] || \
	[ "$ARG3" == "amlab" ] || \
	[ "$ARG4" == "amlab" ]; then build_am_lab; fi;

fi;

echo Done;
