

const Sidefilter = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
  
  
  
  
  
  
  return (
   
   
    <div className="flex items-end gap-2 mb-5">
    <div>
      <label className="block mb-1 font-semibold">Min Price</label>
      <input
        id="min-price"
        type="number"
        value={minPrice}
        placeholder="0"
        onChange={e => onMinChange(e.target.value )}
        className="p-2 border rounded w-24"
      />
    </div>
    <div>
      <label className="block mb-1 font-semibold">Max Price</label>
      <input
        type="number"
        value={maxPrice }
        placeholder="Any"
        onChange={e => onMaxChange(+e.target.value)}
      className="p-2 border rounded w-24"
      />
    </div>
  </div>
 
 
 
 
 

 
  )
}

export default Sidefilter
