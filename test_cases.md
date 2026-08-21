# Northstar Homes AI Assistant — Test Cases

## Test Case 1: Basic Greeting and Enquiry (English)

**Input:** "Hi, I'm interested in buying a flat in Gurugram"

**Expected Behavior:** Bot greets the customer, introduces Northstar One project, and asks about their requirements (BHK preference, budget, timeline).

**Actual Output (example):**
> Welcome to Northstar Homes! Great to hear you're looking for a home in Gurugram.
> We have our project, Northstar One, in Sector 79 — offering 2 BHK and 3 BHK configurations.
> 2 BHK starts at ₹1.35 crore onwards and 3 BHK at ₹1.75 crore onwards.
> What configuration are you looking for, and what's your approximate timeline?

**Pass Criteria:** Bot mentions project name, location, pricing. Does not invent details. Asks a qualifying question.

---

## Test Case 2: Hindi Conversation

**Input:** "Mujhe 3 BHK chahiye, kitna padega?"

**Expected Behavior:** Bot responds in Hindi, shares pricing for 3 BHK, and continues qualifying.

**Actual Output (example):**
> Bilkul! Northstar One mein 3 BHK apartments ₹1.75 crore onwards mein available hain.
> Sector 79, Gurugram mein bahut achhi location hai.
> Kya aap site visit ka plan kar sakte hain? Aapke liye kaunsa din suitable hoga?

**Pass Criteria:** Response is in Hindi. Pricing is accurate. Bot offers site visit.

---

## Test Case 3: Hinglish Conversation

**Input:** "Yaar maine suna hai Sector 79 mein bahut traffic hota hai, is it true?"

**Expected Behavior:** Bot responds in Hinglish, addresses the concern honestly without making claims about traffic.

**Actual Output (example):**
> Achha question hai! Sector 79 Gurugram ka rapidly developing area hai.
> Exact traffic conditions ke liye, I'd suggest you visit the location during your preferred time to get a real feel.
> Humare sales team aapko connectivity aur access routes ke baare mein detail mein bata sakte hain.
> Kya aap site visit ke liye schedule karna chahenge?

**Pass Criteria:** Does not make false claims. Redirects to human team for specifics. Offers site visit.

---

## Test Case 4: Objection — Too Expensive

**Input:** "This is way too expensive for me. I was looking for something under 1 crore."

**Expected Behavior:** Bot acknowledges the concern, highlights value, and offers to connect with sales for flexible options.

**Actual Output (example):**
> I completely understand budget is an important factor.
> While the base pricing starts at ₹1.35 crore for 2 BHK, our sales team can discuss any current offers or flexible payment plans that might work for you.
> Would you like me to arrange a call with them, or would you prefer to visit the site first to see the project in person?

**Pass Criteria:** Doesn't offer unauthorized discounts. Offers human team connection. Remains helpful.

---

## Test Case 5: Site Visit Booking

**Input:** "Yes, I'd like to visit. How about this Saturday?"

**Expected Behavior:** Bot asks for name, phone number, preferred time, then confirms booking.

**Conversation flow:**
> Bot: Great! Saturday works. Could you share your full name and phone number so we can set that up?
> User: Rahul Sharma, 9876543210
> Bot: Perfect, Rahul! Your site visit is confirmed for this Saturday. Our team will reach out to you shortly with the exact time and directions. Looking forward to seeing you at Northstar One!

**Pass Criteria:** Collects required details. Confirms booking. Provides clear next steps.

---

## Test Case 6: Failed Booking (Incomplete Details)

**Input:** User initiates booking but refuses to share phone number.

**Conversation flow:**
> Bot: Could you share your full name and phone number?
> User: I don't want to share my number right now
> Bot: No problem at all! You can always walk in to our sales office at Northstar One, Sector 79, Gurugram. Our team will be happy to assist you. Is there anything else I can help you with?

**Pass Criteria:** Doesn't force the customer. Offers alternative. Keeps door open.

---

## Test Case 7: Customer is Busy

**Input:** "I'm in a meeting right now, can you call me later?"

**Expected Behavior:** Bot acknowledges, asks for a convenient time, and wraps up.

**Actual Output (example):**
> Of course, I won't take your time. When would be a good time to reach out again? I can have our team call you at your convenience.

**Pass Criteria:** Respects the customer's time. Asks for follow-up time. Doesn't push.

---

## Test Case 8: Not Interested

**Input:** "I'm not interested, please don't call me again."

**Expected Behavior:** Bot respects the decision immediately and ends politely.

**Actual Output (example):**
> Understood. I won't contact you again. Have a great day! If you ever need help in the future, Northstar Homes is just a message away.

**Pass Criteria:** Immediate respect for the decision. No pushback. Polite ending.

---

## Test Case 9: Stop Communication Request

**Input:** "Please stop all communication. I don't want any more messages."

**Expected Behavior:** Bot confirms the opt-out clearly.

**Actual Output (example):**
> Understood. I won't contact you again. Have a great day!

**Pass Criteria:** Short, clear confirmation. No further follow-up prompts.

---

## Test Case 10: Unknown Question

**Input:** "What's the maintenance charge per sq ft?"

**Expected Behavior:** Bot honestly says it doesn't have that info and offers to connect with the sales team.

**Actual Output (example):**
> I don't have the specific maintenance charge details right now. But I'd be happy to connect you with our sales team who can share the complete cost breakdown. Would you like that?

**Pass Criteria:** Doesn't invent numbers. Offers human connection. Stays helpful.

---

## Test Case 11: Human Escalation

**Input:** "Can I speak to a real person instead of a bot?"

**Expected Behavior:** Bot offers to connect with the sales team.

**Actual Output (example):**
> Absolutely! I can connect you with our sales team. You can reach them directly at our Northstar sales office in Sector 79, Gurugram. They'll be able to help you with any detailed questions.

**Pass Criteria:** Doesn't fake a transfer. Provides clear contact path. Stays professional.

---

## Test Case 12: Conversation Ending (Post Site Visit Confirmation)

**Input:** "Thanks, that's all I needed."

**Expected Behavior:** Bot wraps up warmly, confirms next steps if any.

**Actual Output (example):**
> You're welcome! To recap, we've scheduled your site visit for Saturday. Our team will reach out with the details.
> If you have any other questions before then, feel free to message anytime. Have a wonderful day, and see you at Northstar One!

**Pass Criteria:** Summarizes confirmed actions. Warm closing. Leaves door open.

---

## Test Case 13: Language Switching (Hinglish to English)

**Input (in sequence):**
1. "3 BHK mein kitna space milega?"
2. "Ok sounds good, what about the nearby schools?"

**Expected Behavior:** Bot responds in Hinglish first, then switches to English when the user switches.

**Pass Criteria:** Bot detects language change and adapts naturally.

---

## Test Case 14: Multiple Questions

**Input:** "What configurations do you have? And what's the price? Also is there a park nearby?"

**Expected Behavior:** Bot answers all questions, provides what it can, and is honest about what it can't answer.

**Pass Criteria:** Addresses each question. Doesn't ignore any. Honest about limitations.
