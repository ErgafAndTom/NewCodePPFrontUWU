import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import PaymentCalculator from "../DiscountCalculator";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/PaymentCalculator">
                <PaymentCalculator/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews