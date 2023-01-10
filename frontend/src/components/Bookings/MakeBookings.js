import { useState } from "react"


function MakeBooking() {
    const [startdate, setStartDate] = useState("mm/dd/yyyy")
    const [endDate, setEndDate] = useState("mm/dd/yyyy")

    return (
        <div className="Booking">
            <div className="CheckIn">
                Check In
                <input
                    type={"date"}
                    value={startdate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="CheckOut">
                Check Out
                <input
                    type={"date"}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </div>
    )
}

export default MakeBooking
