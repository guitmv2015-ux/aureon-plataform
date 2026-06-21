"use client";

import { motion } from "framer-motion";

/**
 * Divisor entre seções que "escritura" a linha da esquerda para a direita
 * ao entrar em viewport — eco visual de uma linha de lançamento contábil.
 * É o único elemento decorativo recorrente do site (elemento de assinatura).
 */
export function LedgerDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden bg-line">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute inset-0 bg-gradient-to-r from-brass via-brass/40 to-transparent"
      />
    </div>
  );
}
