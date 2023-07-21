import Util from "../util";

export const drawArc = (config) => {
    const {
        ctx,
        r,
        startAngle = 0,
        endAngle = 360,
        position,
        fillColor,
        strokeColor,
        lineWidth = 1
    } = config;

    if (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(
            position.x,
            position.y,
            r,
            -Math.PI * (startAngle/180),
            -Math.PI * (endAngle/180),
            true
        )
        fillColor && ctx.fill();
        strokeColor && ctx.stroke();
        ctx.restore();
    }
}

export const drawArcByPolar = (config) => {
    const {
        ctx,
        r,
        startAngle = 0,
        endAngle = 360,
        position,
        centerPoint,
        fillColor,
        strokeColor,
        lineWidth = 1
    } = config;
    const point = Util.polar2cartesian(position.r, position.angle, centerPoint);
    if (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(
            point.x,
            point.y,
            r,
            -Math.PI * (startAngle/180),
            -Math.PI * (endAngle/180),
            true
        )
        fillColor && ctx.fill();
        strokeColor && ctx.stroke();
        ctx.restore();
    }
}