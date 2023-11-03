import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);

  const handleAddBtn = () => {
    const newItem = {
      itemNAme: inputValue,
      quanity: 1,
      isSelected: false,
    };
    const newItems = [...items, newItem]; // copy the state items & add new item to it
    setItems(newItems); // updating the state with the new items
    setInputValue(""); // clears the input field
    setTotalItemCount(totalItemCount + 1); 
  }


  const handleQuantityIncrease = (index) => { // each time the btn is clicked fn gets called we pass the index, which come from the .map fn which iteretes over arr & by index takes the position we currently on
    const newItems = [...items];
    newItems[index].quanity++; // takes the newItems arr by its index & increments the quantity
    setItems(newItems); //handle increase quanity
    calculateTotal(); // calls the calculateTotal() to update the current total items value
  }

  const handleQuantityDecrease = (index) => { // each time the btn is clicked fn gets called we pass the index, which come from the .map fn which iteretes over arr & by index takes the position we currently on
    const newItems = [...items];
    if (newItems[index].quanity > 0) {
    newItems[index].quanity--; // takes the newItems arr by its index & decrements the quantity
    setItems(newItems); //handle increase quanity
    calculateTotal(); // calls the calculateTotal() to update the current total items value
  }}

  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected; // set isSelected to opposite what it currently is
    if (!newItems[index].isSelected) {
      newItems[index].quanity = 0; // if isSelected - false, set quanity: 0
    } else {newItems[index].quanity = 0; }
    setItems(newItems);
  }

  // anytime total quatity changes we want to calculate total based on current quantity,
  // .reduce takes all the items from the arr & makes the one value,
  const calculateTotal = () => {
    const totalItemsCount = items.reduce((total, item) => {
      return total + item.quanity;
    }, 0); 

    setTotalItemCount(totalItemsCount) // update the totalItemCount state to what .reduce returns
  }

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='add-item-input' placeholder='Add an item...' />
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddBtn()} />
				</div>
				<div className='item-list'>
          {items.map((item, index) => <div className='item-container'>
						<div className='item-name' onClick={() => toggleComplete(index)}> 
							{item.isSelected ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} />
									<span className='completed'>{item.itemNAme}</span>
								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle} />
									<span>{item.itemNAme}</span>
								</>
							)}
						</div>
						<div className='quantity'>   
							<button>
								<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)}/>
							</button>
							<span> {item.quanity} </span>
							<button>
								<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)}/> 
							</button>
						</div>
					</div> )}
					
				</div>
				<div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
	);
};

export default App;
