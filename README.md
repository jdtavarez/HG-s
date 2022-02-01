## <img src="https://github.com/jdtavarez/HG-s/blob/main/_doc/logo.png">

<a href="https://jdtavarez.github.io/HG-s/">HandGame/s</a> is an implementation of the popular hand-game, Rock, Paper, Scissors. Utilizing a machine learning model for hand recognition, the player’s moves will be delivered via their camera. After a quick animation the user's hand position will be analyzed and compared to the computer’s selection. A point will be awarded to the winner, and the user will be asked to proceed either to the next round or to play again. 
<br>
# Screenshot

## <img src="https://github.com/jdtavarez/HG-s/blob/main/_doc/screencap.png"><br>

# Code Snippets

The handposition class is central to the functionality of the game. At the moment of evaluation, the user's hand position data will be fed from the TensorFlow model into the class, and analyzed. Because the in-game camera is mirrored, the handed tag from the model is flipped; this is essential to evaluating the thumb's position, as it's frequently orthogonal to the rest of one's hand.
```javascript
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
        this.pose = this.poseSelector();
    };
```

The handAxis function determines the optimal axis for evaluating the user's pose. If the distance between the palm and tip of the second finger is longest in any particular axis, the other fingers should follow suit. Because the pose determination comes from an analysis of the openness or closedness of each finger, it's important to use the axis with the greatest distance.
```javascript
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
```

### <img src="https://github.com/jdtavarez/HG-s/blob/main/_doc/02-landmarks.jpg">

The fingersIsOpen function uses the points on the graphic above to represent the fingers. 
```javascript 
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
            const openBool = fifthAngle > 2.7;
            
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
```

Lastly, the pose selector takes the booleans for finger openness, and determines which pose the user has submitted–rock, paper, or scissors.
```javascript 
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
```

## Technologies, Libraries, & APIs
* Javascript
* HTML/CSS
* MediaPipe
* Canvas
* Webpack

## Future Goals
* Include different versions of the game (e.g. <a href="https://en.wikipedia.org/wiki/Sansukumi-ken">mushi-ken, et al.</a>)
* Include different rule sets (e.g. <a href="https://en.wikipedia.org/wiki/Muk-jji-ppa">muk-jji-ppa</a>)
