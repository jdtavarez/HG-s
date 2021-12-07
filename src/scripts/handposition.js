import { Calculator } from './calculator'

class Handposition {
    constructor(results) {
        this.positions = results.multiHandLandmarks[0];
        this.handed = results.multiHandedness[0].label === 'Right' ? 'Left' : 'Right'
        this.axis = this.handAxisXYZ();
        this.fingers = {
            firstOpen: undefined,
            secondOpen: undefined,
            thirdOpen: undefined,
            fourthOpen: undefined,
            fifthOpen: undefined
        };
        this.fingersIsOpen();
        this.poseSelector.bind(this)
        this.pose = this.poseSelector();
    };


    // hand position will determine conditions for evaulating overall pose
    handAxisXYZ() {
        const palmBase = this.positions[0];
        const secondFingerTip = this.positions[9];

        let axisDistances = new Map();
        axisDistances.set(Math.abs(palmBase.x - secondFingerTip.x), 'x');
        axisDistances.set(Math.abs(palmBase.y - secondFingerTip.y), 'y');
        axisDistances.set(Math.abs(palmBase.z - secondFingerTip.z), 'z');

        const distancesArray = Array.from(axisDistances.keys());
        const maxDistance = Math.max(...distancesArray);

        return axisDistances.get(maxDistance);
    };


    fingersIsOpen() {
        const hand = this;

        const first = this.positions.slice(5, 9);
        const second = this.positions.slice(9, 13);
        const third = this.positions.slice(13, 17);
        const fourth = this.positions.slice(17, 21);
        const fifth = this.positions.slice(1, 5);

        const fingers = [first, second, third, fourth, fifth];

        let pointOne;
        let pointTwo;

        // camera is mirrored so x axis increases from right towards the left
        if (hand.handed === 'Right' && hand.axis === 'x') {
            [pointOne, pointTwo] = [1, 3];
        } else {
            [pointOne, pointTwo] = [3, 1];
        }

        // thumb position is generally orthogonal to hand
        function fifthOpen() {
            
            const palmBase = hand.positions[0];
            const fifthMetacarpal = fifth[1];
            const fifthDistal = fifth[3];

            const fifthAngle = Calculator.angle(
                palmBase,
                fifthMetacarpal,
                fifthDistal
            );

            // trial and error value :(
            const openBool = fifthAngle > 2.78;
            
            return openBool;
        }

        fingers.forEach((e, i) => {
            const openBool = 
            e[pointOne][`${hand.axis}`] < e[pointTwo][`${hand.axis}`];

            if (i === 0) {
                hand.fingers['firstOpen'] = openBool;
            } else if (i === 1) {
                hand.fingers['secondOpen'] = openBool;
            } else if (i === 2) {
                hand.fingers['thirdOpen'] = openBool;
            } else if (i === 3) {
                hand.fingers['fourthOpen'] = openBool;
            } else {
                hand.fingers['fifthOpen'] = fifthOpen();
            }
        })
    };


    poseSelector() {
        let pose;

        const rock = (!this.fingers['firstOpen']
            && !this.fingers['secondOpen']
            && !this.fingers['thirdOpen']
            && !this.fingers['fourthOpen']
            && !this.fingers['fifthOpen']);

        const paper = (this.fingers['firstOpen']
            && this.fingers['secondOpen']
            && this.fingers['thirdOpen']
            && this.fingers['fourthOpen']
            && this.fingers['fifthOpen']);


        const scissors = (this.fingers['firstOpen']
            && this.fingers['secondOpen']
            && !this.fingers['thirdOpen']
            && !this.fingers['fourthOpen']
            && !this.fingers['fifthOpen'])
            || (this.fingers['firstOpen']
            && !this.fingers['secondOpen']
            && !this.fingers['thirdOpen']
            && !this.fingers['fourthOpen']
            && this.fingers['fifthOpen']);

        if (rock) { pose = 'rock' }
        else if (paper) { pose = 'paper' }
        else if (scissors) { pose = 'scissors' }
        else { pose = 'unsure' }

        return pose;
    };

};

export { Handposition }