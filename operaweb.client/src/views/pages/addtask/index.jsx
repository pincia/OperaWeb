import React, { useState } from 'react';
import "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

const AddTaskPage = () => {
    const [task, setTask] = useState({
        supercategory: '',
        subcategory: '',
        subsubcategory: '',
        quantity: 1,
        priceId: ''
    });

    const [priceList, setPriceList] = useState([
        { id: 1, name: "Concrete", unitPrice: 50 },
        { id: 2, name: "Steel", unitPrice: 100 },
        { id: 3, name: "Wood", unitPrice: 30 }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Validate inputs
        if (!task.supercategory || !task.subcategory || !task.subsubcategory || !task.priceId) {
            alert("All fields are required.");
            return;
        }

        const payload = {
            ...task,
            quantity: parseInt(task.quantity, 10)
        };

        // Mock submission logic
        console.log("Task payload submitted:", payload);
        alert("Task added successfully!");
        setTask({ supercategory: '', subcategory: '', subsubcategory: '', quantity: 1, priceId: '' });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add New Task (Lavorazione)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Supercategory:</label>
                    <input
                        type="text"
                        name="supercategory"
                        value={task.supercategory}
                        onChange={handleInputChange}
                        placeholder="Enter supercategory"
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Subcategory:</label>
                    <input
                        type="text"
                        name="subcategory"
                        value={task.subcategory}
                        onChange={handleInputChange}
                        placeholder="Enter subcategory"
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Subsubcategory:</label>
                    <input
                        type="text"
                        name="subsubcategory"
                        value={task.subsubcategory}
                        onChange={handleInputChange}
                        placeholder="Enter subsubcategory"
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={task.quantity}
                        onChange={handleInputChange}
                        min="1"
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Price:</label>
                    <select
                        name="priceId"
                        value={task.priceId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a price</option>
                        {priceList.map(price => (
                            <option key={price.id} value={price.id}>
                                {price.name} - {price.unitPrice} €/unit
                            </option>
                        ))}
                    </select>
                </div>

                <button type="button" onClick={handleSubmit}>Add Task</button>
            </form>
        </div>
    );
};

export default AddTaskPage;

