import React from 'react';
import MechanicOrderMessage from './mechOrder';


function Order() {
    const order = {
        name: 'John Doe',
        vehicle: 'Toyota Camry',
        issue: 'Flat Tire',
        location: '123 Main St, Springfield'
    };

    return (
        <div className="App">
            {/* <MechanicOrderMessage order={order} /> */}
            <MechanicOrderMessage order={order}/>
        </div>
    );
}

export default Order;
