import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

/* =====================
   DYNAMIC ASSET HELPER
   Photos live in public/assets/team/ and are served from the site root.
   encodeURI keeps filenames containing spaces valid inside <img src>.
===================== */
const getTeamImage = (fileName: string) => encodeURI(`/assets/team/${fileName}`);

type Tier = "founder" | "council" | "heads" | "coheads";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  tier: Tier;
};

/* =====================
   REAL TEAM DATA
===================== */
const realTeamMembers: TeamMember[] = [
  /* ---- Tier 1: Founder President ---- */
  {
    id: "1",
    name: "Vikram Khade",
    role: "Founder President",
    image: getTeamImage("vikram khade.jpg"),
    tier: "founder",
  },

  /* ---- Tier 2: Core Council ---- */
  {
    id: "2",
    name: "Adityaraj Kshetre",
    role: "President",
    image: getTeamImage("Adityaraj Kshetre.jpg"),
    tier: "council",
  },
  {
    id: "3",
    name: "Sharvan Koul",
    role: "Vice President",
    image: getTeamImage("sharvan koul.jpeg"),
    tier: "council",
  },
  {
    id: "4",
    name: "Shivanand Potle",
    role: "Secretary",
    image: getTeamImage("shivanand-potle.jpg"),
    tier: "council",
  },
  {
    id: "5",
    name: "Shreyash Mangale",
    role: "Treasurer",
    image: getTeamImage("Shreyash Mangale.jpeg"),
    tier: "council",
  },

  /* ---- Tier 3: Heads of Department ---- */
  {
    id: "6",
    name: "Tanishka Bellale",
    role: "Graphics Design Head",
    image: getTeamImage("tanishka.jpeg"),
    tier: "heads",
  },
  {
    id: "7",
    name: "Ishanvi Gawade",
    role: "Polytechnic Head",
    image: getTeamImage("ishanvi.jpeg"),
    tier: "heads",
  },
  {
    id: "8",
    name: "Purva Kadam",
    role: "Technical Operations Head",
    image: getTeamImage("purva.jpeg"),
    tier: "heads",
  },
  {
    id: "9",
    name: "Vedika Palve",
    role: "PR Head",
    image: getTeamImage("vedika.jpg"),
    tier: "heads",
  },
  {
    id: "10",
    name: "Aditya Dolchipure",
    role: "Media Production Head",
    image: getTeamImage("Aditya dolchipure.jpg"),
    tier: "heads",
  },
  {
    id: "11",
    name: "Prathmesh Shinde",
    role: "Membership Director",
    image: getTeamImage("prathmesh.png"),
    tier: "heads",
  },
  {
    id: "12",
    name: "Komal Patil",
    role: "Student Relations Director",
    image: getTeamImage("komal.jpeg"),
    tier: "heads",
  },
  {
    id: "13",
    name: "Janhavi Wankhade",
    role: "Club Service Director",
    image: getTeamImage("janhavi.jpg"),
    tier: "heads",
  },
  {
    id: "14",
    name: "Aaditi Metkari",
    role: "Mechanical Department Head",
    image: getTeamImage("aaditi metkari.jpeg"),
    tier: "heads",
  },
  {
    id: "15",
    name: "Diksha Dhembre",
    role: "CS Department Head",
    image: getTeamImage("diksha.jpeg"),
    tier: "heads",
  },
  {
    id: "16",
    name: "Eshika Swami",
    role: "IT Department Head & Associate PR Officer",
    image: getTeamImage("eshika.jpeg"),
    tier: "heads",
  },

  /* ---- Tier 4: Co-Heads & Associates ---- */
  {
    id: "17",
    name: "Tanishka Gawale",
    role: "Graphics Co-Head",
    image: getTeamImage("Tanishka Gawale.jpg"),
    tier: "coheads",
  },
  {
    id: "18",
    name: "Aditi Bhupatwar",
    role: "Technical Co-Head",
    image: getTeamImage("aditi.jpeg"),
    tier: "coheads",
  },
  {
    id: "19",
    name: "Virendra Khade",
    role: "Event Co-Head",
    image: getTeamImage("Virendra Khade.jpg"),
    tier: "coheads",
  },
  {
    id: "20",
    name: "Viraj Chandekar",
    role: "Media Production Manager",
    image: getTeamImage("Viraj.jpg"),
    tier: "coheads",
  },
  {
    id: "21",
    name: "Hardik Jain",
    role: "Associate Club Service Director",
    image: getTeamImage("hardik.jpeg"),
    tier: "coheads",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const TeamPage: React.FC = () => {
  const founder = realTeamMembers.filter((m) => m.tier === "founder");
  const council = realTeamMembers.filter((m) => m.tier === "council");
  const heads = realTeamMembers.filter((m) => m.tier === "heads");
  const coheads = realTeamMembers.filter((m) => m.tier === "coheads");

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <Card className="group overflow-hidden border border-[#d4af37] shadow-[3px_3px_0px_#3c2a1a] bg-[#fdf5e6] rounded-none relative h-full">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
        <CardContent className="p-0 relative z-10 flex flex-col h-full">
          <div className="aspect-square relative overflow-hidden border-b border-[#d4af37] bg-[#1a120b]">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Member";
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-8 w-8 text-[#d4af37]/50" />
              </div>
            )}
          </div>
          <div className="p-3 sm:p-4 text-center flex-grow">
            <h3 className="font-serif text-sm sm:text-lg font-bold text-[#2d1e12] leading-tight mb-1">{member.name}</h3>
            <p className="text-[#741b1b] text-[9px] sm:text-xs font-bold uppercase tracking-tighter sm:tracking-widest font-serif italic">{member.role}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const TeamSection = ({ title, members }: { title: string; members: TeamMember[] }) => (
    <section className="mb-16">
      <h2 className="text-2xl sm:text-3xl mb-6 text-[#d4af37] font-bold border-b border-[#d4af37]/30 pb-2 inline-block">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
        {members.map((m) => (
          <TeamMemberCard key={m.id} member={m} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="pt-20 min-h-screen bg-[#1a120b] text-[#f3e5ab] font-serif relative overflow-hidden px-2 sm:px-4">
      <div className="container mx-auto py-10 text-center relative z-10">
        <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-[#d4af37]" style={{ fontFamily: "serif" }}>
          The Order of Sambhav
        </h1>

        {/* Tier 1 - Founder President */}
        <div className="flex justify-center mb-16 px-4">
          {founder.map((m) => (
            <div key={m.id} className="w-full max-w-[280px] sm:max-w-sm">
              <TeamMemberCard member={m} />
            </div>
          ))}
        </div>

        {/* Tier 2 - Core Council */}
        <TeamSection title="Core Council" members={council} />

        {/* Tier 3 - Heads of Department */}
        <TeamSection title="Heads of Department" members={heads} />

        {/* Tier 4 - Co-Heads & Associates */}
        <section className="pb-10">
          <h2 className="text-2xl sm:text-3xl mb-6 text-[#d4af37] font-bold border-b border-[#d4af37]/30 pb-2 inline-block">
            Co-Heads &amp; Associates
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
            {coheads.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
