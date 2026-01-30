import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import IdentifierKeyComp from "./IdentifierKeyComp";
import IdsInfo from "./IdsInfo";

const TeamSection = () => {
  const sections = [
    {
      title: "Identifier Key",
      description:
        "To connect team members through various channels.",
      content: <IdentifierKeyComp />,
    },
    {
      title: "Telegram Notification IDs",
      description: "Your connected telegram chat Ids.",
      content: <IdsInfo chatIds={["asdfdfas", "osmething", "kglajgdf"]}/>,
    },
    {
      title: "Discord ChatIds",
      description: "Your connected discord chat Ids.",
      content: <IdsInfo chatIds={["asdfdfas", "osmething", "kglajgdf"]}/>,
    },
  ];
  return (
    <section>
      {sections.map((section, index) => (
        <div key={section.title}>
          {index !== 0 && <Separator />}

          <div className="w-full h-auto rounded-2xl grid grid-rows-[100px_auto] mb-5">
            <div className="flex flex-col h-full w-full p-5 lg:p-10">
              <h1 className="text-foreground text-xl mb-2 font-montserrat">{section.title}</h1>
              <p className="text-muted-foreground text-sm">
                {section.description}
              </p>
            </div>

            <div>
              <CardContent className="p-5 lg:p-10">
                {section.content}
              </CardContent>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TeamSection;
