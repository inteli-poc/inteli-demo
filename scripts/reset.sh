#!/bin/sh
# RUN RESET ALL:
# ./scripts/reset.sh [all]
# Where the argument is optional
# OR RUN RESET INDIVIDUAL PERSONA:
# ./scripts/reset.sh [cust] [am] [lab] [amlab]
# Where all three arguments are optional but minimum one should be present

ARG1=$1;
ARG2=$2;
ARG3=$3;
ARG4=$4;

reset_all() {
	echo ResetAll;
	rm -rf data/cust/;
	rm -rf data/am/;
	rm -rf data/lab/;
	rm -rf data/am-lab/;
}

reset_cust() {
	echo ResetCust;
	rm -rf data/cust/;
}

reset_am() {
	echo ResetAM;
	rm -rf data/am/;
}

reset_lab() {
	echo ResetLab;
	rm -rf data/lab/;
}

reset_am_lab() {
	echo ResetAMLab;
	rm -rf data/am-lab/;
}

if [ "$ARG1" == "all" ] || \
[ "$ARG1" == "" ]; then

	reset_all;

else

	if [ "$ARG1" == "cust" ] || \
	[ "$ARG2" == "cust" ] || \
	[ "$ARG3" == "cust" ] || \
	[ "$ARG4" == "cust" ]; then reset_cust; fi;

	if [ "$ARG1" == "am" ] || \
	[ "$ARG2" == "am" ] || \
	[ "$ARG3" == "am" ] || \
	[ "$ARG4" == "am" ]; then reset_am; fi;

	if [ "$ARG1" == "lab" ] || \
	[ "$ARG2" == "lab" ] || \
	[ "$ARG3" == "lab" ] || \
	[ "$ARG4" == "lab" ]; then reset_lab; fi;

	if [ "$ARG1" == "amlab" ] || \
	[ "$ARG2" == "amlab" ] || \
	[ "$ARG3" == "amlab" ] || \
	[ "$ARG4" == "amlab" ]; then reset_am_lab; fi;

fi;
