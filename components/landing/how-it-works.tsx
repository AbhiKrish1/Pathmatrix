const steps = [
  {
    step: "01",
    title: "Import your routes",
    description:
      "Upload waypoints, connect your fleet data, or draw paths directly on the map.",
  },
  {
    step: "02",
    title: "Analyze the matrix",
    description:
      "Compare alternatives across distance, time, and cost with live analytics dashboards.",
  },
  {
    step: "03",
    title: "Deploy optimized paths",
    description:
      "Push the best routes to your team and monitor performance in real time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            From raw data to optimized routes in three steps
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-border md:block" />
              )}
              <div className="text-center md:text-left">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {item.step}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
