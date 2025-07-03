const BasicDetailsForm = () => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="date" placeholder="Date of Birth" className="input-style" />
      <input type="number" placeholder="Age" className="input-style" />
      <input type="text" placeholder="PAN Number" className="input-style" />
      <input type="text" placeholder="Father's Name" className="input-style" />
      <input type="text" placeholder="Differently Abled Type" className="input-style" />
      <input type="email" placeholder="Personal Email" className="input-style" />
      <input type="text" placeholder="Address Line 1" className="input-style" />
      <input type="text" placeholder="Address Line 2" className="input-style" />
      <input type="text" placeholder="City" className="input-style" />
      <input type="text" placeholder="State" className="input-style" />
      <input type="text" placeholder="Pincode" className="input-style" />
    </form>
  )
}
export default BasicDetailsForm
