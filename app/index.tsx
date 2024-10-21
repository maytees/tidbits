import * as Device from "expo-device";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import Tidbits from "~/components/Tidbit";

export default function Index() {
  const { height } = useWindowDimensions();
  console.log(height, Device.modelName);

  const aiStory = `
Quite simply a terrifying story...\
In recent years, AI has emerged as a \
transformative force across industries. \
From enhancing healthcare diagnostics \
to revolutionizing financial services, its \
impact is undeniable. This tidbit delves \
into the key developments driving AI's \
ascent and explores its potential to reshape our \
future. Join us as we uncover the fascinating world of artificial \


A mind-bending journey into the quantum realm...\
Quantum computing stands on the brink of a technological revolution. \
With the power to solve complex problems in seconds that would take \
classical computers millennia, its potential is staggering. \
This tidbit explores the fundamental principles of quantum mechanics, \
the current state of quantum hardware, and the transformative \
applications across fields like cryptography, drug discovery, and \
financial modeling. Prepare to have your understanding of computation \

Quite simply a terrifying story...\
In recent years, AI has emerged as a \
transformative force across industries. \
From enhancing healthcare diagnostics \
to revolutionizing financial services, its \
impact is undeniable. This tidbit delves \
into the key developments driving AI's \
ascent and explores its potential to reshape our \
future. Join us as we uncover the fascinating world of artificial \


A mind-bending journey into the quantum realm...\
Quantum computing stands on the brink of a technological revolution. \
With the power to solve complex problems in seconds that would take \
classical computers millennia, its potential is staggering. \
This tidbit explores the fundamental principles of quantum mechanics, \
the current state of quantum hardware, and the transformative \
applications across fields like cryptography, drug discovery, and \
financial modeling. Prepare to have your understanding of computation \

Quite simply a terrifying story...\
In recent years, AI has emerged as a \
transformative force across industries. \
From enhancing healthcare diagnostics \
to revolutionizing financial services, its \
impact is undeniable. This tidbit delves \
into the key developments driving AI's \
ascent and explores its potential to reshape our \
future. Join us as we uncover the fascinating world of artificial \


A mind-bending journey into the quantum realm...\
Quantum computing stands on the brink of a technological revolution. \
With the power to solve complex problems in seconds that would take \
classical computers millennia, its potential is staggering. \
This tidbit explores the fundamental principles of quantum mechanics, \
the current state of quantum hardware, and the transformative \
applications across fields like cryptography, drug discovery, and \
financial modeling. Prepare to have your understanding of computation \
  `;

  const quantumStory = `
A mind-bending journey into the quantum realm...\
Quantum computing stands on the brink of a technological revolution. \
With the power to solve complex problems in seconds that would take \
classical computers millennia, its potential is staggering. \
This tidbit explores the fundamental principles of quantum mechanics, \
the current state of quantum hardware, and the transformative \
applications across fields like cryptography, drug discovery, and \
financial modeling. Prepare to have your understanding of computation \
  `;

  const renewableStory = `
A beacon of hope in the climate crisis...\
As the world grapples with the urgent need for sustainable solutions, \
renewable energy sources are taking center stage. From solar and wind \
to emerging technologies like tidal and geothermal power, the landscape \
of clean energy is rapidly evolving. This tidbit examines the latest \
breakthroughs in renewable tech, the economic factors driving adoption, \
and the potential for these innovations to reshape global energy systems. \
Join us in exploring how renewable energy is paving the way for a greener \
  `;

  return (
    <View
      className="items-center h-screen"
      style={{
        paddingTop: height <= 667 ? 40 : 80,
      }}
    >
      <Tidbits
        tidbits={[
          {
            title: "Rise of Artificial Intelligence",
            content: aiStory,
            name: "AI_Insights",
            username: "ai_insights",
            avatarUrl: "https://avatars.githubusercontent.com/u/88852870?v=4",
          },
          {
            title: "The Future of Quantum Computing",
            content: quantumStory,
            name: "Quantum_Insights",
            username: "quantum_insights",
            avatarUrl: "https://avatars.githubusercontent.com/u/95250?v=4",
          },
          {
            title: "Advancements in Renewable Energy",
            content: renewableStory,
            name: "Renewable_Insights",
            username: "renewable_insights",
            avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
          },
        ]}
      />
    </View>
  );
}
