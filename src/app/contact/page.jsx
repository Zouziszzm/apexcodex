import HoverLine from "@/components/common/animated-comps/underline"
import TransitionLink from "@/components/common/link/link"
import AnimatedText from "@/components/common/text/text"

const page = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center flex-col">
        <AnimatedText>currently under construction , or i missed something and am fixing it </AnimatedText>

        <HoverLine lineClassName="h-[1px] bg-foreground">
          <AnimatedText>
            <TransitionLink href={"/about"}>
              for now you can know more about me from here.
            </TransitionLink>
          </AnimatedText>
        </HoverLine>
      </div>
    </>
  )
}

export default page
