const usersObj = {
  1: {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  2: {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  3: {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
};

//object freeze make a object immutable
//not able to add properties and not able to delete any properties(not about child properties)
// Object.freeze(usersObj);
// usersObj[1] = "nahid";
// console.log(usersObj);

// ** filter objects
// const userId = 1;
// const filterObj = Object.values(usersObj).filter((user) => user.id === userId);
// console.log(filterObj);

// ** find objects
// const userId = 2;
// const findObj = Object.values(usersObj).filter((user) => user.id === userId);
// console.log(findObj);

// ** mapping objects
// const mapObj = Object.values(usersObj).map((user) => user);
// console.log(mapObj);

// ** foreach objects
// Object.values(usersObj).forEach((user) => console.log(user));
