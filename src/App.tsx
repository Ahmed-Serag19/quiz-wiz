import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import NotFoundComponents from "./components/NotFoundComponents";
import AuthLayout from "./layouts/AuthLayout";
import MasterLayout from "./layouts/MasterLayout";
import ChangePassword from "./modules/auth/ChangePassword/ChangePassword";
import ForgotPassword from "./modules/auth/ForgotPassword/ForgotPassword";
import LoginRegister from "./modules/auth/LoginRegister/LoginRegister";
import ResetPassword from "./modules/auth/ResetPassword/ResetPassword";
import Homepage from "./modules/Dashboard/HomePage";
import ListGroups from "./modules/instructor/ListGroups/ListGroups";
import QuestionBank from "./modules/instructor/Question Bank/QuestionBank";
import Quizzes from "./modules/instructor/Quizzes/Quizzes";
import ViewQuiz from "./modules/instructor/Quizzes/ViewQuiz";
import ResultDetails from "./modules/instructor/Results/ResultDetails";
import Results from "./modules/instructor/Results/Results";
import Students from "./modules/instructor/Students/Students";
import StudentesQuestions from "./modules/Students/StudentesQuestions/StudentesQuestions";
import StudentQuiz from "./modules/Students/StudentQuiz/StudentQuiz";
import { RootState } from "./store/store";
function App() {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.auth.profile);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <LoginRegister />,
        },
        {
          path: "auth",
          element: <LoginRegister />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: profile?.role === "Instructor" ? <Homepage/> : <Quizzes />,
        },
        {
          path: "home-page",
          element: profile?.role === "Instructor" ? <Homepage/> : <NotFoundComponents />,
        },
        {
          path: "quizzes",
          element: <Quizzes />,
        },
        {
          path: "quizzes/:quizId",
          element: profile?.role === "Instructor" ? <ViewQuiz/> : <NotFoundComponents />,
        },
        {
          path: "question-bank",
          element: profile?.role === "Instructor" ? <QuestionBank/> : <NotFoundComponents />,
        },
        {
          path: "results",
          element: <Results />,
        },
        {
          path: "result-details",
          element: <ResultDetails/>,
        },
        {
          path: "students",
          element: profile?.role === "Instructor" ? <Students/> : <NotFoundComponents />,
        },
        {
          path: "student-quiz",
          element: profile?.role === "Student" ? <StudentQuiz/> : <NotFoundComponents />,
        },

        {
          path: "student-question",
          element: profile?.role === "Student" ? <StudentesQuestions/> : <NotFoundComponents />,
        },

        { path: "list-groups",
          element: profile?.role === "Instructor" ? <ListGroups/> : <NotFoundComponents />,
        
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
