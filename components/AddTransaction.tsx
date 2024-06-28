"use client";

import addTransaction from "@/app/actions/addTransaction";

export default function AddTransaction() {
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      alert(error);
    } else {
      alert("Transaction saved");
      console.log(data);
    }
  };
  return (
    <>
      <h3>Add Transaction</h3>
      <form action={clientAction}>
        <div className="form-control">
          <label htmlFor="text"></label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount..."
            step="0.01"
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
}
