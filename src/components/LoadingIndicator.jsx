import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

//loading spinner
const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
            <div
                style={{
                    width:'100%',
                    height: '100',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                    <ThreeDots color={'#FAF9F6'} height={100} width={100}/>

            </div>
        )
    )
}

export default LoadingIndicator;