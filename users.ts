export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export const users: User[] = [
  
  {
    id: "1",
    username: "priyteshprasad",
    email: "priytesh.official@gmail.com",
    password: "password",
    role: "ADMIN"
  },
  {
    id: "2",
    username: "Admin User",
    email: "admin.user@example.com",
    password: "password",
    role: "ADMIN"
  },
  {
    id: "3",
    username: "studentuser",
    email: "student.user@example.com",
    password: "password",
    role: "STUDENT"
  },
  
];

export const addUser = (user: User) => {
  // Look for an existing user
  const existingUser = findUserByEmailPassword(user.email, user.password);

  if (!existingUser) {
    users.push(user);
  }
};

export const findUser = (id: string) => users.find((u) => u.id === id);

export const findUserByEmailPassword = (email: string, password: string) =>
  users.find((u) => u.email === email && u.password === password);

export const deleteUser = (id: string) => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
};
