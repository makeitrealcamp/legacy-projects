import { useState, useEffect } from "react";
import TitleManageCourse from "../components/TitleManageCourse";
import InputTitleLanding from "../components/InputTItleLanding";
import ReactQuill from "react-quill";
import SelectPricing from "../components/ComponentPricing";
import OptionsPricing from "../components/ComponentPricing/options";
import PromotionalSource from "../components/PromotionalSources";
import CoursesManageNav from "../components/CoursesManageNav";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LearnInYourCourse from "../components/LearnInYourCourse";
import CreateClass from "../components/CreateClass";
import { UpdateCourse } from "../apis/updateCourse";
import { Ring } from "@uiball/loaders";

function CoursesManage() {
  const [thisCourse, setThisCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "English(US)",
    level: "",
    category: "",
    primaryTaught: "",
    learningObjectives: [],
    requirements: [],
    intendedLearners: [],
    price: "",
    classes: [],
    image: "",
    video: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = useParams();

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  console.log(thisCourse)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HEROKU_URL}/courses/${url.course}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setThisCourse(res.data.data);
      })
      .catch((err) => {
        navigate("*");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleThisCourse = (key, value) => {
    setThisCourse({...thisCourse,[key]:value})
  };

  return (
    <div className="main-container-courses-manage">
      <CoursesManageNav
        state={thisCourse}
        action={UpdateCourse}
        nameCourse={thisCourse.title}
        courseId={url.course}
      />
      <div className="container-courses-manage">
        <div className="main-container-manage-goals">
          <TitleManageCourse title="Manage your course" />
          <div className="container-manage-goals">
            {loading ? (
              <div className="container-loader-signup-form">
                <Ring size={35} color="#231F20" />
              </div>
            ) : (
              <>
                <InputTitleLanding
                  value={thisCourse.title}
                  action={handleThisCourse}
                  id="title"
                  limitNum={60}
                  place="Insert your course title."
                  keyObj={"title"}
                >
                  Course title
                </InputTitleLanding>
                <p className="label-input-landing">Course description</p>
                <ReactQuill
                  value={thisCourse.description}
                  placeholder="Insert your course description."
                  onChange={(e) => {
                    handleThisCourse("description", e);
                  }}
                  modules={modules}
                />
                <p className="label-input-landing">Basic info</p>
                <div className="container-pricing-select">
                  <SelectPricing name="languaje" id="languaje">
                    <OptionsPricing value="US">English(US)</OptionsPricing>
                  </SelectPricing>

                  <SelectPricing
                    keyObj={"level"}
                    name="level"
                    id="level"
                    action={handleThisCourse}
                  >
                    <OptionsPricing value="null">
                      --Select Level--
                    </OptionsPricing>

                    <OptionsPricing
                      state={thisCourse.level}
                      value="Beginner level"
                    >
                      Beginner level
                    </OptionsPricing>
                    <OptionsPricing
                      state={thisCourse.level}
                      value="Intermediate level"
                    >
                      Intermediate level
                    </OptionsPricing>
                    <OptionsPricing
                      state={thisCourse.level}
                      value="Expert level"
                    >
                      Expert level
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.level} value="All levels">
                      All levels
                    </OptionsPricing>
                  </SelectPricing>

                  <SelectPricing
                    keyObj={"category"}
                    name="Category"
                    id="Category"
                    action={handleThisCourse}
                  >
                    <OptionsPricing state={thisCourse.category} value="null">
                      --Select Category--
                    </OptionsPricing>
                    <OptionsPricing
                      state={thisCourse.category}
                      value="Development"
                    >
                      Development
                    </OptionsPricing>
                    <OptionsPricing
                      state={thisCourse.category}
                      value="IT & Software"
                    >
                      IT & Software
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.category} value="Design">
                      Design
                    </OptionsPricing>
                    <OptionsPricing
                      state={thisCourse.category}
                      value="Marketing"
                    >
                      Marketing
                    </OptionsPricing>
                    <OptionsPricing
                      state={thisCourse.category}
                      value="Teaching & Academics"
                    >
                      Teaching & Academics
                    </OptionsPricing>
                  </SelectPricing>
                </div>
                <InputTitleLanding
                  value={thisCourse.primaryTaught}
                  action={handleThisCourse}
                  limitNum={-1}
                  place="e.g Landscape Photography."
                  keyObj={"primaryTaught"}
                >
                  What is primarily taught in your course?
                </InputTitleLanding>
                <p className="label-input-landing">Course image</p>
                <PromotionalSource
                  accept=".png, .jpg, .jpeg"
                  id="source-image"
                  video={false}
                  action={handleThisCourse}
                  keyObj={"image"}
                  value={thisCourse.image}
                />
                <p className="label-input-landing">Promotional video</p>
                <PromotionalSource
                  accept="video/mp4,video/x-m4v,video/*"
                  id="source-video"
                  video={true}
                  action={handleThisCourse}
                  keyObj={"video"}
                  value={thisCourse.video}
                />

                <p className="p-manage-goals">
                  The following descriptions will be publicly visible on your
                  Course Landing Page and will have a direct impact on your
                  course performance. These descriptions will help learners
                  decide if your course is right for them.
                </p>
                <LearnInYourCourse
                  title="What will students learn in your course?"
                  info="You must enter at least 2 learning objectives or outcomes that learners can expect to achieve after completing your course."
                  minInputs={thisCourse.learningObjectives}
                  limit={true}
                  place="Example: Define the roles and responsibilities of a project manager"
                  limitNum={160}
                  action={handleThisCourse}
                  keyObj={"learningObjectives"}
                />
                <LearnInYourCourse
                  title="What are the requirements or prerequisites for taking your course?"
                  info="List the required skills, experience, tools or equipment learners should have prior to taking your course.
                If there are no requirements, use this space as an opportunity to lower the barrier for beginners."
                  minInputs={thisCourse.requirements}
                  limit={false}
                  place='Example: No programming experience needed. You will learn everything you need to know"'
                  limitNum={-1}
                  action={handleThisCourse}
                  keyObj={"requirements"}
                />
                <LearnInYourCourse
                  title="Who is this course for?"
                  info="Write a clear description of the intended learners for your course who will find your course content valuable.
                This will help you attract the right learners to your course."
                  minInputs={thisCourse.intendedLearners}
                  limit={false}
                  place='Example: No programming experience needed. You will learn everything you need to know"'
                  limitNum={-1}
                  action={handleThisCourse}
                  keyObj={"intendedLearners"}
                />

                <CreateClass />

                <h3 className="subtitle-manage-pricing">Course Price Tier</h3>
                <p className="p-manage-pricing">
                  Please select the price tier for your course below and click
                  'Save'. The list price that students will see in other
                  currencies is determined using the price tier matrix.
                </p>
                <p className="p-manage-pricing">
                  If you intend to offer your course for free, the total length
                  of video content must be less than 2 hours.
                </p>
                <div className="container-pricing-select">
                  <SelectPricing name="currency" id="currency">
                    <OptionsPricing value="USD">USD</OptionsPricing>
                  </SelectPricing>

                  <SelectPricing
                    keyObj={"price"}
                    action={handleThisCourse}
                    name="price"
                    id="price"
                  >
                    <OptionsPricing state={thisCourse.price} value="Free">
                      Free
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={19.99}>
                      $19.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={24.99}>
                      $24.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={29.99}>
                      $29.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={34.99}>
                      $34.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={39.99}>
                      $39.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={44.99}>
                      $44.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={49.99}>
                      $49.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={54.99}>
                      $54.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={59.99}>
                      $59.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={64.99}>
                      $64.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={69.99}>
                      $69.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={74.99}>
                      $74.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={79.99}>
                      $79.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={84.99}>
                      $84.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={89.99}>
                      $89.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={94.99}>
                      $94.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={99.99}>
                      $99.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={109.99}>
                      $109.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={119.99}>
                      $119.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={124.99}>
                      $124.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={129.99}>
                      $129.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={139.99}>
                      $139.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={149.99}>
                      $149.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={159.99}>
                      $159.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={169.99}>
                      $169.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={174.99}>
                      $174.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={179.99}>
                      $179.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={189.99}>
                      $189.99
                    </OptionsPricing>
                    <OptionsPricing state={thisCourse.price} value={199.99}>
                      $199.99
                    </OptionsPricing>
                  </SelectPricing>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CoursesManage;
