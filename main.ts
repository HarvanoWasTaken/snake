function Update (hello: string) {
    temp1 = HeadPos.get(0) + MoveDir.get(0)
    temp2 = HeadPos.get(1) + MoveDir.get(1)
    HeadPos = [temp1, temp2]
    if (HeadPos.get(0) == FruitPos.get(0) && HeadPos.get(1) == FruitPos.get(1)) {
        led.plotBrightness(HeadPos.get(0), HeadPos.get(1), DarkMode * 255)
        FruitPos = NewFruit(FruitPos.get(0), FruitPos.get(1))
        DisplayFruit(FruitPos)
        SnakeBodyPos.unshift(HeadPos)
    } else {
        if (SnakeBodyPos.find(pos => pos[0] === HeadPos[0] && pos[1] === HeadPos[1])) {
            let t2 = SnakeBodyPos.get(SnakeBodyPos.length - 1)
SnakeBodyPos.pop()
            if (SnakeBodyPos.find(pos => pos[0] === HeadPos[0] && pos[1] === HeadPos[1])) {
                Restart()
            }
            SnakeBodyPos.insertAt(SnakeBodyPos.length, t2)
            led.plotBrightness(SnakeBodyPos.get(SnakeBodyPos.length - 1).get(0), SnakeBodyPos.get(SnakeBodyPos.length - 1).get(1), 255 * Math.abs(DarkMode - 1))
            led.plotBrightness(HeadPos.get(0), HeadPos.get(1), DarkMode * 255)
            SnakeBodyPos.unshift(HeadPos)
            SnakeBodyPos.pop()
        } else {
            // console.log(temp3)
            led.plotBrightness(SnakeBodyPos.get(SnakeBodyPos.length - 1).get(0), SnakeBodyPos.get(SnakeBodyPos.length - 1).get(1), 255 * Math.abs(DarkMode - 1))
            led.plotBrightness(HeadPos.get(0), HeadPos.get(1), DarkMode * 255)
            SnakeBodyPos.unshift(HeadPos)
            SnakeBodyPos.pop()
        }
    }
}
function MakeListWithSizeOf (xPos: number, yPos: number, ExcludeX: number, ExcludeY: number) {
    let Output: number[][] = []
    for (let x = 0; x <= xPos - 1; x++) {
        for (let y = 0; y <= yPos - 1; y++) {
            if (x != ExcludeX && y != ExcludeY) {
                Output.unshift([x, y])
            }
        }
    }
    return Output
}
// Define Buttons
input.onButtonPressed(Button.A, function () {
    if (Playing) {
        ButtonPressed = -1
    }
})
// Define Functons
function Turn (By: number, Direction: any[]) {
    if (By == 1) {
        temp3 = [0 - Direction.get(1), Direction.get(0)]
        return temp3
    }
    if (By == -1) {
        temp3 = [Direction.get(1), 0 - Direction.get(0)]
        return temp3
    }
    return Direction
}
function Restart () {
    ResetAllLeds()
    temp1 = undefined
    temp2 = undefined
    temp3 = undefined
    Middle = [1, 2]
    RealMiddle = [1, 2]
    FruitSpawnStart = [3, 2]
    FruitPos = FruitSpawnStart
    DarkMode = 1
    DisplayFruit(FruitPos)
    StartPos = Middle
    HeadPos = StartPos
    SnakeBodyPos = []
    SnakeBodyPos.unshift(StartPos)
    MoveDir = [1, 0]
    Playing = false
    led.plot(Middle.get(0), Middle.get(1))
}
function DisplayFruit (Pos: any[]) {
    led.plotBrightness(Pos.get(0), Pos.get(1), (63 * DarkMode) + (125 * Math.abs(DarkMode - 1)))
}
function ResetAllLeds () {
    for (let x2 = 0; x2 <= 4; x2++) {
        for (let y2 = 0; y2 <= 4; y2++) {
            led.unplot(x2, y2)
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    if (Playing) {
        Playing = false
    } else {
        Playing = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (Playing) {
        ButtonPressed = 1
    }
})
input.onGesture(Gesture.Shake, function () {
    led.toggleAll()
    DarkMode = Math.abs(DarkMode - 1)
    DisplayFruit(FruitPos)
})
function NewFruit (x: number, y: number) {
    t = MakeListWithSizeOf(4, 4, x, y)
    let t1:number[] | undefined
    let candidate: any[]
    while (true) {
        // t1 = SnakeBodyPos.find(t.get(randint(0, t.length - 1)))
        randomIndex = Math.floor(Math.random() * t.length)
        candidate = t[randomIndex]
        t1 = SnakeBodyPos.find(pos => pos[0] === candidate[0] && pos[1] === candidate[1])
    if (t1 == undefined) {
            return candidate
        }
    }
    return t1
}
let randomIndex = 0
let t: number[][] = []
let HeadPos: number[] = []
let StartPos: number[] = []
let FruitPos: number[] = []
let SnakeBodyPos: any[][] = []
let temp1: any
let temp2: any
let temp3: any
let Middle: any[]
let RealMiddle: any[]
let FruitSpawnStart: any[]
let DarkMode: number
let ButtonPressed: number
FruitPos = FruitSpawnStart
// DisplayFruit(FruitPos)
StartPos = Middle
HeadPos = StartPos
let MoveDir: any[]
let Playing: boolean
// led.plot(RealMiddle.get(0), RealMiddle.get(1))
Restart()
basic.forever(function () {
    if (Playing) {
        basic.pause(1000)
        MoveDir = Turn(ButtonPressed, MoveDir)
        ButtonPressed = 0
        Update("Hi")
        if (HeadPos.get(0) <= -1 || HeadPos.get(0) >= 5 || HeadPos.get(1) <= -1 || HeadPos.get(1) >= 5) {
            Restart()
        }
    }
})
