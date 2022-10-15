

export default function FilterBtns(props) {
    return (
        <div>
            <div className='home-head'>
              <p>-- Menu Items --</p>
              <span>What are you ordering from Labongoes today</span>
            </div>
            <div className='filter-btn-container'>
                <button onClick={props.filterFood}>Food</button>
                <button onClick={props.filterSmoothy}>Smoothy</button>
                <button onClick={props.filterDrinks}>Soft Drinks</button>
                <button onClick={props.filterAlcohol}>Alcohol</button>
            </div>
        </div>
    )
}