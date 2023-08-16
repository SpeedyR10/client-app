import React, {useState, Fragment} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCart from './ShoppingCart';
import styles from './OrderForm.module.css'
import OrderDetails from './OrderDetails';
import { useSelector } from 'react-redux';
import { userSelector } from '../features/User/userSlice';


export default function OrderForm() {
    
    const steps = ['Carrinho', 'Detalhes da encomenda', 'Pagamento'];

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const { shoppingCart } = useSelector(userSelector);

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
        isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        const newCompleted = completed;
        newCompleted[activeStep - 1] = false;
        setCompleted(newCompleted);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    //     setCompleted({});
    // };

    const getStepContent = (activeStep) => { 
        switch (activeStep) {
            case 0:
                return <ShoppingCart/>
            case 1:
                return <OrderDetails/>
            case 2:
                return <label>Step 2</label>
            default:
                return <label>Step 3</label>
        }
    }

    return (
        <Box sx={{ width: '100%', marginTop: '20px'}}>
            <Stepper activeStep={activeStep} className={styles.stepper} alternativeLabel>
                {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                    <StepLabel>
                        {label}
                    </StepLabel>
                </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                <Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {/* <Button onClick={handleReset}>Reset</Button> */}
                    </Box>
                </Fragment>
                ) : (
                <Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            variant='contained'
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Retroceder
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {shoppingCart.length !== 0 && 
                            <Button variant='contained' onClick={handleComplete} sx={{ mr: 1 }}>
                                Seguinte
                            </Button>
                        }
                    </Box>
                </Fragment>
                )}
            </div>
        </Box>
    );
}