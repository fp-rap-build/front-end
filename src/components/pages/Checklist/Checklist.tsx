import React from 'react';

export default function Checklist() {
  return (
    <div>
      <div>
        <input
          type="checkbox"
          id="accntMgr"
          name="accntMgr"
          value="accntMngr"
        />
        <label htmlFor="accntMgr">Account Manager Approval</label>
      </div>
      <div>
        <input type="checkbox" id="apMgr" name="apMgr" value="apMngr" />
        <label htmlFor="apMgr">APM Approval</label>
      </div>
      <div>
        <input type="checkbox" id="pMgr" name="pMgr" value="pMngr" />
        <label htmlFor="pMgr">Program Manager Approval</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="bookKeeper"
          name="bookKeeper"
          value="bookKeeper"
        />
        <label htmlFor="bookKeeper">Book Keeper Approval</label>
      </div>

      <div>
        <input type="checkbox" id="headAccn" name="headAccn" value="headAccn" />
        <label htmlFor="headAccnt">Head Accountant Approval</label>
      </div>

      <div>
        <input type="checkbox" id="admin" name="admin" value="admin" />
        <label htmlFor="admin">Admin Approval</label>
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </div>
  );
}
