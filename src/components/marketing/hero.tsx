"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink pt-20">
      {/* Assinatura visual de fundo: grid sutil + halo bronze — apenas no hero. */}
      <div className="absolute inset-0 bg-noise-grid" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-fade" aria-hidden />

      <Container className="relative z-10">
        <motion.span
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="ledger-tick"
        >
          Gestão Patrimonial Institucional
        </motion.span>

        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-7 max-w-4xl font-display text-display-lg text-ivory md:text-display-xl"
        >
          Patrimônio administrado com o rigor que ele exige.
        </motion.h1>

        <motion.p
          custom={0.25}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-7 max-w-xl text-base leading-relaxed text-slate md:text-lg"
        >
          A Aureon Partners estrutura, protege e expande capital de famílias, empresas e
          instituições através de advisory independente, governança sólida e decisões
          orientadas por dados — não por modismos de mercado.
        </motion.p>

        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href="/contato">
              Agende uma conversa <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sobre">Conhecer a Aureon</Link>
          </Button>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute inset-x-0 bottom-10 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-slate-dim">
          <span className="text-eyebrow uppercase tracking-[0.22em]">Role para conhecer</span>
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-brass"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
