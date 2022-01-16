import { Pedometer } from 'expo-sensors';
import React, { useState, useEffect } from 'react';
import { getnDayBefore, converttoDay } from './FormatDate.js';

export default function useStepCounter() {

    const [isPedometerAvailable, setisPedometerAvailable] = useState('checking');
    const [pastStepCount, setpastStepCount] = useState(0);
    const [currentStepCount, setcurrentStepCount] = useState(0);

    // defining previous 6 days (Pedomater data available for 7 days retrospectively)

    const yesterday = getnDayBefore(new Date().setHours(0, 0, 0, 0), 1);
    const dbefore2 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 2);
    const dbefore3 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 3);
    const dbefore4 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 4);
    const dbefore5 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 5);
    const dbefore6 = getnDayBefore(new Date().setHours(0, 0, 0, 0), 6);

    const [yesterdayStepCount, setyesterdayStepCount] = useState(0);
    const [daybefore1StepCount, setdaybefore1StepCount] = useState(0);
    const [daybefore2StepCount, setdaybefore2StepCount] = useState(0);
    const [daybefore3StepCount, setdaybefore3StepCount] = useState(0);
    const [daybefore4StepCount, setdaybefore4StepCount] = useState(0);
    const [daybefore5StepCount, setdaybefore5StepCount] = useState(0);
    const [daybefore6StepCount, setdaybefore6StepCount] = useState(0);


    useEffect(() => {
        _subscribe();
        return () => {
            _unsubscribe();
        }
    }, [])

    //pedometer function
    _subscribe = () => {
        _subscription = Pedometer.watchStepCount(result => {
            setcurrentStepCount(result.steps)
        });


        // Availability check for Pedometer on device
        Pedometer.isAvailableAsync().then(
            result => {
                setisPedometerAvailable(String(result))
            },
            error => {
                setisPedometerAvailable('Could not get isPedometerAvailable: ' + error)
            }
        );

        // Stepcount for actual day (d)
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                setpastStepCount(result.steps)
            },
            error => {
                setpastStepCount('Could not get stepCount: ' + error)
            }
        );

        // Stepcounts for previous days (d-1... d-6)
        Pedometer.getStepCountAsync(yesterday, start).then(
            result => {
                setyesterdayStepCount(result.steps);
            },
            error => {
                setyesterdayStepCount('Could not get stepCount: ' + error)
            }
        );

        Pedometer.getStepCountAsync(dbefore2, yesterday).then(
            result => {
                setdaybefore2StepCount(result.steps);
            },
            error => {
                setdaybefore2StepCount('Could not get stepCount: ' + error)
            }
        );

        Pedometer.getStepCountAsync(dbefore3, dbefore2).then(
            result => {
                setdaybefore3StepCount(result.steps);
            },
            error => {
                setdaybefore3StepCount('Could not get stepCount: ' + error)
            }
        );

        Pedometer.getStepCountAsync(dbefore4, dbefore3).then(
            result => {
                setdaybefore4StepCount(result.steps);
            },
            error => {
                setdaybefore4StepCount('Could not get stepCount: ' + error)
            }
        );

        Pedometer.getStepCountAsync(dbefore5, dbefore4).then(
            result => {
                setdaybefore5StepCount(result.steps);
            },
            error => {
                setdaybefore5StepCount('Could not get stepCount: ' + error)
            }
        );

        Pedometer.getStepCountAsync(dbefore6, dbefore5).then(
            result => {
                setdaybefore6StepCount(result.steps);
            },
            error => {
                setdaybefore6StepCount('Could not get stepCount: ' + error)
            }
        );

    };

    //unsubscribe pedometer
    _unsubscribe = () => {
        _subscription && _subscription.remove();
        _subscription = null;
    };

    var weeklySteps = [];

    weeklySteps[0] = pastStepCount + currentStepCount;
    weeklySteps[1] = yesterdayStepCount
    weeklySteps[2] = daybefore2StepCount
    weeklySteps[3] = daybefore3StepCount
    weeklySteps[4] = daybefore4StepCount
    weeklySteps[5] = daybefore5StepCount
    weeklySteps[6] = daybefore6StepCount

    return [weeklySteps];

}