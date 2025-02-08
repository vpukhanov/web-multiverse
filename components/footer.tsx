export default function Footer() {
  return (
    <footer className="mt-8 space-y-2 text-center text-sm text-muted-foreground">
      <div>
        Web Multiverse is completely imaginary. Any resemblance to real world
        websites and events is coincidental.
      </div>
      <div className="flex justify-center space-x-4">
        <a
          href="https://github.com/vpukhanov/web-multiverse"
          target="_blank"
          className="underline hover:text-foreground"
        >
          Source Code
        </a>
        <span>·</span>
        <div>
          Made by{" "}
          <a
            href="https://pukhanov.ru"
            target="_blank"
            className="underline hover:text-foreground"
          >
            Vyacheslav Pukhanov
          </a>
        </div>
      </div>
    </footer>
  );
}
