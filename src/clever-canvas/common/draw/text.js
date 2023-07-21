import Util from "../util";

export const drawText = (config) => {
    const {
        ctx,
        text,
        position,
        font = '4px Microsoft YaHei',
        fillColor,
        strokeColor,
        maxWidth,
        textAlign = 'center',
        textBaseline = 'alphabetic'
    } = config;

    if (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.font = font;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        if (maxWidth) {
            fillColor && ctx.fillText(text, position.x, position.y, maxWidth);
            strokeColor && ctx.strokeText(text, position.x, position.y, maxWidth);
        } else {
            fillColor && ctx.fillText(text, position.x, position.y);
            strokeColor && ctx.strokeText(text, position.x, position.y);
        }
        ctx.restore();
    }
}

export const drawTextByPolar = (config) => {
    const {
        ctx,
        text,
        position,
        centerPoint,
        font = '4px Microsoft YaHei',
        fillColor,
        strokeColor,
        maxWidth,
        textAlign = 'center',
        textBaseline = 'alphabetic'
    } = config;
    const point = Util.polar2cartesian(position.r, position.angle, centerPoint);
    if (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.font = font;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        if (maxWidth) {
            fillColor && ctx.fillText(text, point.x, point.y, maxWidth);
            strokeColor && ctx.strokeText(text, point.x, point.y, maxWidth);
        } else {
            fillColor && ctx.fillText(text, point.x, point.y);
            strokeColor && ctx.strokeText(text, point.x, point.y);
        }
        ctx.restore();
    }
}