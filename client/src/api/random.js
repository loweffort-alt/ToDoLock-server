const randomPhoneNumberGenerator = () => {
  const phoneNumber = [9];
  for (let i = 0; i < 8; i++) {
    const randomNumber = Math.random() * 10;
    phoneNumber.push(Math.floor(randomNumber));
  }
  console.log(phoneNumber.join(""));
};

randomPhoneNumberGenerator();
