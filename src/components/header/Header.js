import React, { useState } from 'react'
import "./header.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"

const Header = (props) => {
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    const handleOption = (name, operation) =>{
        setOptions((prev) => {
            return{
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    return (
        <div className="header">
            <div style={{margin: props.type === "list"?"20px 0px 0px 0px":"20px 0px 60px 0px"}} className="headerContainer">

                <div className="headerList">
                    <div className="headerListItem active">
                        <i className="fa-solid fa-bed"></i>
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <i className="fa-solid fa-plane"></i>
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <i className="fa-solid fa-car"></i>
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <i className="fa-solid fa-bed"></i>
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <i className="fa-solid fa-taxi"></i>
                        <span>Airport taxis</span>
                    </div>
                </div>
                { props.type !== "list" && 
                <>
                <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                <p className="headerDesc">Get rewarded for your travels - unlock instant saving of 10% of more with a free --Booking account</p>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <i className="fa-solid fa-bed headerIcon"></i>
                        <input type="text" placeholder='Where are you going?' className='headerSearchInput' />
                    </div>
                    <div className="headerSearchItem">
                        <i className="fa-solid fa-calendar-days headerIcon"></i>
                        <span onClick={()=>setOpenDate(!openDate)}
                         className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date} className="date"
                        />}
                        
                    </div>
                    <div className="headerSearchItem">
                        <i className="fa-solid fa-person headerIcon"></i>
                        <span onClick={()=>{setOpenOptions(!openOptions)}} className="headerSearchText">{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                        { openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult
                                </span>
                                <div className="optionCounter">
                                <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                <span className="optionCounterNumber">{options.adult}</span>
                                <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children
                                </span>
                                <div className="optionCounter">
                                <button disabled={options.children <= 0}  className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                <span className="optionCounterNumber">{options.children}</span>
                                <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room
                                </span>
                                <div className="optionCounter">
                                <button disabled={options.room <= 1}   className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                                <span className="optionCounterNumber">{options.room}</span>
                                <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn">Search</button>
                    </div>
                </div> 
                </>
                }
            </div>

        </div>
    )
}

export default Header