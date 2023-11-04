import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);

  // handleAddBtn() fn handles the adding item to the arr of items
  const handleAddBtn = () => {
    if (inputValue.trim() !== '') { 
// checking if something was typed in the input section
// .trim() deletes spaces from the begining & end of the 
// inputValue & checks if after deliting the spaces inputValue isnt empty
      const newItem = {
        itemName: inputValue, 
        quanity: 1,
        isSelected: false,
      };
      const newItems = [...items, newItem]; // copy the state items & add new item to it
      setItems(newItems); // updating the state with the new items
      setInputValue(''); // clears the input field
      setTotalItemCount(totalItemCount + 1);
    } else {
      alert('Please enter an item before adding.');
    } // result of the fn is true if inputValue has any text & false if the inputValue is an empty string or only spaces
  };

  // handleQuantityIncrease() fn increase the amount of items
  const handleQuantityIncrease = (index) => { // each time the btn is clicked fn gets called we pass the index, which come from the .map fn which iteretes over arr & by index takes the position we currently on
    const newItems = [...items];
    newItems[index].quanity++; // takes the newItems arr by its index & increments the quantity
    setItems(newItems); //handle increase quanity
    calculateTotal(); // calls the calculateTotal() to update the current total items value
  }

    // handleQuantityDecrease() fn decrease the amount of items
  const handleQuantityDecrease = (index) => { // each time the btn is clicked fn gets called we pass the index, which come from the .map fn which iteretes over arr & by index takes the position we currently on
    const newItems = [...items];
    if (newItems[index].quanity > 0) {
    newItems[index].quanity--; // takes the newItems arr by its index & decrements the quantity
    setItems(newItems); //handle increase quanity
    calculateTotal(); // calls the calculateTotal() to update the current total items value
  }}

  // toggleComplete() fn handles the checking if item was completed by taken the index of the item
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

  // handleKeyPress is a fn that takes an event to call the handleAddBtn(), when the user presses 'Enter' keyboard
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddBtn(); // call the fn to add the item from the input by pressing the "Enter" key
     }
  }

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} className='add-item-input' placeholder='Add an item...' />
					<FontAwesomeIcon className="add-item-btn" icon={faPlus} onClick={() => handleAddBtn()} />
				</div>
				<div className='item-list'>
          {items.map((item, index) => <div className='item-container'>
						<div className='item-name' onClick={() => toggleComplete(index)}> 
							{item.isSelected ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} />
									<span className='completed'>{item.itemName}</span>
								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle} />
									<span>{item.itemName}</span>
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
