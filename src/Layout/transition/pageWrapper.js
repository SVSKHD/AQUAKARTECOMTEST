import { AnimatePresence, motion } from 'framer-motion';
import {Container} from "react-bootstrap"
const AquaPageWrapper = (props) =>{
    return(
<>
    <AnimatePresence>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        <Container>
            <div className="mb-2"/>
        {props.children}
        </Container>
        </motion.div>
    </AnimatePresence>
</>
    )
}
export default  AquaPageWrapper
