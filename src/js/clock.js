const width = 500
const height = 100
const TimeItemWidth = 100
const AmPmFontSize = 32
const lineHeight = 80
const commonFont = {
    fontSize: lineHeight,
    lineHeight: lineHeight,
    textColor: 0xffffffff
}
class App extends lng.Application {
    static _template() {
        return {
            TimeWrapper: {
                flex: { direction: 'row' },
                mount: .1,
                x: 90,
                y: 10,
                Hours: { w: TimeItemWidth, children: [{ type: ChangeValue }, { type: ChangeValue, x: TimeItemWidth * 0.5 }] },
                ColonOne: { text: Object.assign({ text: ':' }, commonFont) },
                Minutes: { w: TimeItemWidth, children: [{ type: ChangeValue }, { type: ChangeValue, x: TimeItemWidth * 0.5 }] },
                ColonTwo: { text: Object.assign({ text: ':' }, commonFont) },
                Seconds: { w: TimeItemWidth, children: [{ type: ChangeValue }, { type: ChangeValue, x: TimeItemWidth * 0.5 }] },
                AmPm: { x: 10, y: 0, type: ChangeValue, fontSize: AmPmFontSize }
            }
        }
    }
    setTime(lastTime) {
        const currentDate = new Date()
        currentDate.setSeconds(currentDate.getSeconds() - 1)
        if (!lastTime || currentDate.toString() !== lastTime.toString()) {
            const nextDate = new Date()
            this.setCurrentNext('Hours', currentDate.getHours(), nextDate.getHours())
            this.setCurrentNext('Minutes', currentDate.getMinutes(), nextDate.getMinutes())
            this.setCurrentNext('Seconds', currentDate.getSeconds(), nextDate.getSeconds())
            this.tag('AmPm').patch({
                currentValue: currentDate.getHours() >= 12 ? 'PM' : 'AM',
                nextValue: currentDate.getHours() >= 12 ? 'PM' : 'AM'
            })
        }
        window.requestAnimationFrame(() => this.setTime(currentDate))
    }
    setCurrentNext(tagName, currentValue = '', nextValue = '') {
        const tag = this.tag(tagName)
        currentValue = currentValue.toString().padStart(2, '0').split('')
        nextValue = nextValue.toString().padStart(2, '0').split('')
        tag.children = tag.children.map((child, i) => {
            child.patch({ currentValue: currentValue[i], nextValue: nextValue[i] })
            return child
        })
    }
    _init() {
        this.setTime()
    }
}
class ChangeValue extends lng.Component {
    _construct() {
        this.duration = 0.7
        this.commonFont = commonFont
    }
    _init() {
        this.tag('Group').children.forEach((child) => {
            child.patch({
                text: {
                    fontSize: this.fontSize || this.commonFont.fontSize,
                    lineHeight: this.lineHeight || this.commonFont.lineHeight
                }
            })
        })
    }
    static _template(that) {
        return {
            Group: {
                Current: {
                    text: Object.assign(
                        {
                            text: this.bindProp(['currentValue', 'nextValue'], (ctx) => {
                                const currentValue = ctx.currentValue
                                const nextValue = ctx.nextValue
                                if (currentValue !== nextValue) {
                                    ctx.changePosition(ctx)
                                }
                                return currentValue
                            })
                        },
                        that.commonFont
                    )
                },
                Next: {
                    y: that.commonFont.lineHeight * -1,
                    alpha: 1,
                    scale: 0.5,
                    text: Object.assign({ text: this.bindProp(['nextValue']) }, that.commonFont)
                }
            }
        }
    }
    changePosition(ctx) {
        ctx.tag('Group').setSmooth('y', ctx.commonFont.lineHeight, { duration: ctx.duration })
        ctx.tag('Current').setSmooth('alpha', 0, { duration: ctx.duration })
        ctx.tag('Current').setSmooth('scale', 0.5, { duration: ctx.duration })
        ctx.tag('Next').setSmooth('alpha', 1, { duration: ctx.duration })
        ctx.tag('Next').setSmooth('scale', 1, { duration: ctx.duration })
        ctx.tag('Next').transition('scale').on('finish', () => { ctx.resetPosition(ctx) })
    }
    resetPosition(ctx) {
        ctx.tag('Current').patch({
            text: { text: ctx.nextValue },
            alpha: 1,
            scale: 1
        })
        ctx.tag('Group').patch({ y: 0 })
        ctx.tag('Next').patch({ alpha: 0, scale: 0.5 })
    }
}
const StartApp = new App({ stage: { w: 500, h: 100 } })

const canvasApp = StartApp.stage.getCanvas()
document.querySelector('#clock').appendChild(canvasApp)