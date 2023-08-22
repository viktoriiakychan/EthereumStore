import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import { WalletBar } from "@components/ui/web3";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button } from "@components/ui/common";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();

  return (
    <>
      <div className="py-4">
        <WalletBar address={account.data} 
        network=
        {{ 
          data: network.data,
          target: network.target,
          isSupported: network.isSupported,
          hasInitialRespoce: network.hasInitialRespoce
        }} />
      
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4 float-right">
                <Button className=" mt-4 px-16" onClick={() => setSelectedCourse(course)} variant="purple">
                  Order
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
    </>
  );
}
export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
