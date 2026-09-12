"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";

export default function ImpactStats() {
  return (
    <section className="relative z-20 border-y border-zinc-800/80 py-10 bg-void">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-zinc-800/60">
          {resumeData.impactMetrics.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-center text-left md:px-8"
            >
              <div className="mb-2 font-mono text-4xl font-bold tracking-tight text-white md:text-5xl">
                {item.value}
              </div>

              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-300 font-mono">
                {item.label}
              </div>

              <div className="text-xs leading-normal text-zinc-500">
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
