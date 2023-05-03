export const getFormcontent = ({ templateId }: any) => {
  switch (templateId) {
    case 1:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="phone">Email</label>
  <input type="phone" id="phone" name="phone" placeholder="Phone" required="" />
  <label for="message">Message</label>
  <textarea
    id="message"
    name="message"
    placeholder="Message"
    required="" ></textarea>
  <button type="submit">Send</button>
</form>
      `;
      break;
    case 2:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="phone">Email</label>
  <input type="text" id="phone" name="phone" placeholder="Phone" required="" />
  <label for="complaint">Complaint</label>
  <textarea
    id="complaint"
    name="complaint"
    placeholder="Complaint"
    required="" ></textarea>
  <button type="submit">Send</button>
</form>
      `;
      break;
    case 3:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="phone">Email</label>
  <input type="phone" id="phone" name="phone" placeholder="Phone" required="" />
  <label for="address">Address</label>
  <input type="text" id="address" name="address" placeholder="Address" required="" />
  <label for="city">City</label>
  <input type="text" id="city" name="city" placeholder="City" required="" />
  <label for="country">Country</label>
  <input type="text" id="country" name="country" placeholder="Country" required="" />
  <button type="submit">Register</button>
</form>
      `;
      break;
    case 4:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="phone">Email</label>
  <input type="phone" id="phone" name="phone" placeholder="Phone" required="" />
  <label for="budget">Budget</label>
  <select id="budget" name="budget">
    <option value="<5000">less than 5000</option>
    <option value="5000-10000">5000-10000</option>
    <option value="10000-15000">10000-15000</option>
    <option value="15000-20000">15000-20000</option>
    <option value="20000-25000">20000-25000</option>
  </select>
  <label for="requestFor">How can we Help You</label>
  <textarea
    id="requestFor"
    name="requestFor"
    placeholder="How can we Help You"
    required="" ></textarea>
  <button type="submit">Request Quotation</button>
</form>
        `;
      break;
    case 5:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="companyName">Company Name</label>
  <input type="text" id="companyName" name="companyName" placeholder="Company Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="phone">Email</label>
  <input type="phone" id="phone" name="phone" placeholder="Phone" required="" />
  <label for="address">Address</label>
  <input type="text" id="address" name="address" placeholder="Address" required="" />
  <label for="city">City</label>
  <input type="text" id="city" name="city" placeholder="City" required="" />
  <label for="country">Country</label>
  <input type="text" id="country" name="country" placeholder="Country" required="" />
  <label for="orderDate">Order Date</label>
  <input type="date" id="orderDate" name="orderDate" placeholder="Order Date" required="" />
  <label for="orderDetails">Order Details</label>
  <input type="text" id="orderDetails" name="orderDetails" placeholder="orderDetails" required="" />
  <button type="submit">Send Request </button>
</form>
      `;
      break;
    case 6:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="phone">Email</label>
  <input type="phone" id="phone" name="phone" placeholder="Phone" required="" />
  <label for="department">Department</label>
  <select id="department" name="department">
    <option value="Front Desk">Front Desk</option>
    <option value="Customer Care">Customer Care</option>
    <option value="Shipping & Receiving">Shipping & Receiving</option>
    <option value="Billing & Accounting">Billing & Accounting</option>
    <option value="Administration">Administration</option>
    <option value="Housekeeping">Housekeeping</option>
    <option value="Security">Security</option>
  </select>
  <label for="message">Message</label>
  <textarea
    id="message"
    name="message"
    placeholder="Message"
    required="" ></textarea>
  <button type="submit">Send</button>
</form>
      `;
      break;
    case 7:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="phone">Email</label>
  <input type="phone" id="phone" name="phone" placeholder="Phone" required="" />
  <label for="companyName">Company Name</label>
  <input type="text" id="companyName" name="companyName" placeholder="Company Name" required="" />
  <label for="compatitors">How are Your Company's compatitors</label>
  <input type="text" id="compatitors" name="compatitors" placeholder="How are Your Company's compatitors" required="" />
  <label for="helpType">what type of help do you need?</label>
  <select id="helpType" name="helpType">
    <option value="Just plan">Just plan</option>
    <option value="Paln and execution">Paln and execution</option>
    <option value="Execution">Execution</option>
    <option value="I'm not sure">I'm not sure</option>
  </select>
  <label for="budget">Do you have budget in your mind?</label>
  <input type="text" id="budget" name="budget" placeholder="budget" required="" />
  <label for="requestFor">How can we Help You</label>
  <textarea
    id="requestFor"
    name="requestFor"
    placeholder="How can we Help You"
    required="" ></textarea>
  <button type="submit">Send Request </button>
</form>
        `;
      break;
    case 8:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="willAttend">Will You Attend</label>
  <select id="willAttend" name="willAttend">
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
  <label for="guest">And with how many guest</label>
  <select id="guest" name="guest">
    <option value=1>1</option>
    <option value=2>2</option>
    <option value=3>3</option>
    <option value=4>4</option>
    <option value=5>5</option>
  </select>
  <button type="submit">Submit</button>
</form>
      `;
      break;
    case 9:
      return `
<form action="https://formzillion.com/f/{form_id}">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Name" required="" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="Email" required="" />
  <label for="phone">Email</label>
  <input type="phone" id="phone" name="phone" placeholder="Phone" required="" />
  <label for="feedbackType">Feedback Type</label>
  <select id="feedbackType" name="feedbackType">
    <option value="comments">Comments</option>
    <option value="suggestions">Suggestions</option>
    <option value="questions">Questions</option>
  </select>
  <label for="description">Describe your Feedback</label>
  <textarea
    id="description"
    name="description"
    placeholder="description"
    required="" ></textarea>
  <button type="submit">Send</button>
</form>
        `;
      break;
  }
};
