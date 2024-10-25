export default function Info() {
    return (
        <section className="bg-background py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:justify-center lg:justify-between items-center gap-8">
                    <div className="max-w-xs text-center md:text-left">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200">生徒会の概要</h2>
                        <p className="mt-4 text-muted-foreground text-gray-600 dark:text-gray-400">
                            生徒会は色々頑張ってます
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <a
                            href="https://www.youtube.com/@SeikoStudentCouncil_ITEC"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <PlayIcon className="h-5 w-5" />
                            生徒会紹介動画を見る
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
    );
}