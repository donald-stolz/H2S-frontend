// API methods
import axios from "axios";

const getAllStudents = async () => {
  const response = await axios.get(
    "https://h2s-sms-api.herokuapp.com/students"
  );
  return response.data;
};

const getStudent = async login => {
  const response = await axios.get(
    `https://h2s-sms-api.herokuapp.com/students/${login}`
  );
  return response.data;
};

const addGoal = async (login, goal) => {
  const response = await axios.post(
    `https://h2s-sms-api.herokuapp.com/evaluations/${login}`,
    { evaluation: { goal } }
  );
  return response.data;
};

const updateEvaluation = async (login, evaluation) => {
  const response = await axios.patch(
    `https://h2s-sms-api.herokuapp.com/evaluations/${login}`,
    { evaluation }
  );
  return response.data;
};

const checkIn = async (login, val) => {
  const response = await axios.patch(
    `https://h2s-sms-api.herokuapp.com/checkin/${login}`,
    {
      checkin_status: val
    }
  );
  return response.data;
};

const addStudentToGroup = async (login, group) => {
  console.log(login, group);

  const response = await axios.patch(
    `https://h2s-sms-api.herokuapp.com/groups/students/${login}`,
    { group }
  );
  return response.data;
};

const getAllGroups = async () => {
  const response = await axios.get("https://h2s-sms-api.herokuapp.com/groups");
  return response.data;
};

const getGroup = async code => {
  const response = await axios.get(
    `https://h2s-sms-api.herokuapp.com/groups/${code}`
  );
  return response.data;
};

const updateMentor = async (code, mentor) => {
  const response = await axios.patch(
    `https://h2s-sms-api.herokuapp.com/groups/${code}`,
    {
      mentor
    }
  );
  return response.data;
};

export {
  getAllStudents,
  getAllGroups,
  getStudent,
  addStudentToGroup,
  getGroup,
  updateMentor,
  addGoal,
  updateEvaluation,
  checkIn
};
