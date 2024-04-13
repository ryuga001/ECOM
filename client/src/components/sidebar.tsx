
const SideBar = () => {
    return (
        <div className="sideBarContainer">
            <h2>Filter</h2>
            <form>

                <div>
                    <label htmlFor="category">Category</label>
                    <select id="category">
                        <option value="all">All</option>
                        <option value="book">Book</option>
                        <option value="clothes">Clothes</option>
                        <option value="gym">Gym</option>
                        <option value="watches">Watches</option>
                        <option value="book">Book</option>
                        <option value="book">Book</option>
                        <option value="book">Book</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input id="price" value="price" type="range" min="0" max="1000" />
                </div>

                <button>Filter</button>
            </form>
        </div>
    )
}

export default SideBar