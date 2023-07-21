import { drawText, drawTextByPolar } from './text';
import { drawArc, drawArcByPolar } from './arc';
import { drawEllipse, drawEllipseByPolar } from './ellipse';

class Draw {
    text(ctx, config) {
        drawText({
            ctx,
            ...config
        })
    }

    textByPolar(ctx, config) {
        drawTextByPolar({
            ctx,
            ...config
        })
    }

    arc(ctx, config) {
        drawArc({
            ctx,
            ...config
        })
    }

    arcByPolar(ctx, config) {
        drawArcByPolar({
            ctx,
            ...config
        })
    }

    ellipse(ctx, config) {
        drawEllipse({
            ctx,
            ...config
        })
    }

    ellipseByPolar(ctx, config) {
        drawEllipseByPolar({
            ctx,
            ...config
        })
    }
}

const draw = new Draw();
export default draw;