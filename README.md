# My-Portfolio
<form class="cform reveal" id="contact-form"
      action="https://formsubmit.co/riteshkasaudhan975@gmail.com"
      method="POST">

  <!-- Email Subject -->
  <input type="hidden" name="_subject" value="New Portfolio Contact Message">

  <!-- Email Template -->
  <input type="hidden" name="_template" value="table">

  <div class="frow">

    <div class="fg">
      <label for="fullname">Name <span>*</span></label>
      <input id="fullname" name="fullname"
             type="text" placeholder="Your name" required>
    </div>

    <div class="fg">
      <label for="email">Email <span>*</span></label>
      <input id="email" name="email"
             type="email" placeholder="you@example.com" required>
    </div>

    <div class="fg">
      <label for="mobile">Mobile</label>
      <input id="mobile" name="mobile"
             type="tel" placeholder="+91 XXXXX XXXXX">
    </div>

    <div class="fg">
      <label for="subject">Subject <span>*</span></label>
      <input id="subject" name="subject"
             type="text" placeholder="Project / opportunity" required>
    </div>

    <div class="fg full">
      <label for="message">Message <span>*</span></label>
      <textarea id="message" name="message" rows="6"
                placeholder="Tell me a little about your idea..."
                required></textarea>
    </div>

  </div>

  <button type="submit" class="btn btn-cyan btn-full">
    <i class="fa-regular fa-paper-plane"></i>
    Send via Email
  </button>

  <div id="form-status" class="fst" aria-live="polite"></div>

</form>
