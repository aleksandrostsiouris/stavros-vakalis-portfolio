import React, { useEffect, useState, useId } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
// Data
import { name, showResume } from "../data/portfolio.json";
import { resume } from "../data/portfolio.json";
import { useSession } from "next-auth/react";

const Resume = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);
  const { status } = useSession();
  const id = useId();

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, []);
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          {status !== 'authenticated' ?
            <></> :
            <Button onClick={() => router.push("/edit")} type={"primary"}>
              Edit Resume
            </Button>}
        </div>
      )}

      <div className="container mx-auto mb-10">
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${mount && theme.theme === "dark" ? "bg-gray-900" : "bg-slate-200"
                } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-3xl font-bold">{name}</h1>
              <h2 className="text-xl mt-5">{resume.tagline}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">
                {resume.description}
              </h2>
              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Experience</h1>

                {resume.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    ></ProjectResume>
                  )
                )}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Education</h1>
                {resume.education && resume.education.map(x => {
                  return (
                    <div className="mt-2" key={`${x.universityName}-${x.universityDate}`}>
                      {
                        x.universityName.split("|").map((u, idx) => {
                          if (idx === 1) {
                            return (
                              <h2 key={id} className="text-m">
                                {u}
                              </h2>
                            );
                          }
                          return (
                            <h2 key={id} className="text-lg font-semibold">
                              {u}
                            </h2>
                          );
                        })
                      }
                      {/* <h2 className="text-lg">{x.universityName}</h2> */}
                      <h3 className="text-sm opacity-75">
                        {x.universityDate}
                      </h3>
                      {x.universityPara && x.universityPara.length > 0 && x.universityPara.split("|").length > 0 ?
                        x.universityPara.split("|").map((s, idx) => {
                          return (<p className="text-sm opacity-50" key={idx}>
                            {s}
                          </p>
                          )
                        }) :
                        <p className="text-sm mt-2 opacity-50">
                          {x.universityPara}
                        </p>}
                    </div>)
                })}
              </div>
              {resume.languages.length > 0 || resume.frameworks.length > 0 || resume.others.length > 0 &&
                <div className="mt-5">
                  <h1 className="text-2xl font-bold">Skills</h1>
                  <div className="flex mob:flex-col desktop:flex-row justify-between">
                    {resume.languages && (
                      <div className="mt-2 mob:mt-5">
                        <h2 className="text-lg">Languages</h2>
                        <ul className="list-disc">
                          {resume.languages.map((language, index) => (
                            <li key={index} className="ml-5 py-2">
                              {language}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resume.frameworks && (
                      <div className="mt-2 mob:mt-5">
                        <h2 className="text-lg">Frameworks</h2>
                        <ul className="list-disc">
                          {resume.frameworks.map((framework, index) => (
                            <li key={index} className="ml-5 py-2">
                              {framework}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resume.others && (
                      <div className="mt-2 mob:mt-5">
                        <h2 className="text-lg">Others</h2>
                        <ul className="list-disc">
                          {resume.others.map((other, index) => (
                            <li key={index} className="ml-5 py-2">
                              {other}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
