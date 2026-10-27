"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import { ArrowUpRight01Icon, PlayIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import Image from "next/image"

import type { ResolvedVideoPlayerSection } from "@/lib/content-schema"

type Item = ResolvedVideoPlayerSection["items"][number]

// A click on a link that the browser should handle itself (new tab, new
// window, download) is left alone.
function isPlainClick(event: MouseEvent) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

// The one client island of the video-player section. Every playlist is a real
// link to YouTube, so it works without JavaScript and crawlers see it. With
// JavaScript, a plain click selects the playlist in the player instead.
// The player is a facade (thumbnail + play button, itself a link): nothing is
// requested from YouTube until the visitor presses play, then the iframe takes
// its place and gets focus. Selecting another playlist shows its facade; it
// never starts playing by itself.
function LessonPlayer({
  items,
  defaultVideo,
}: {
  items: Item[]
  defaultVideo: string
}) {
  const [selectedId, setSelectedId] = useState(defaultVideo)
  const [playing, setPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const selected = items.find((item) => item.id === selectedId) ?? items[0]

  useEffect(() => {
    if (playing) iframeRef.current?.focus()
  }, [playing])

  return (
    <div
      data-slot="lesson-player"
      className="grid gap-6 lg:grid-cols-12 lg:gap-8"
    >
      <div className="flex flex-col gap-4 lg:col-span-7">
        <div className="relative aspect-video overflow-clip rounded-xl bg-muted">
          {playing ? (
            <iframe
              key={selected.id}
              ref={iframeRef}
              src={selected.embedSrc}
              title={`${selected.title} lessons, YouTube playlist`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <a
              key={selected.id}
              href={selected.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Play ${selected.title} lessons`}
              onClick={(event) => {
                if (!isPlainClick(event)) return
                event.preventDefault()
                setPlaying(true)
              }}
              className="group/play absolute inset-0 outline-none"
            >
              <Image
                src={selected.thumbnail.src}
                alt={selected.thumbnail.alt}
                fill
                sizes="(min-width: 1024px) 38rem, (min-width: 768px) 44rem, 100vw"
                className="object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/10 transition-colors duration-200 ease-out group-hover/play:bg-foreground/20 group-focus-visible/play:outline-2 group-focus-visible/play:-outline-offset-4 group-focus-visible/play:outline-ring motion-reduce:transition-none">
                <span className="flex size-16 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-200 ease-out group-hover/play:scale-105 group-active/play:scale-95 motion-reduce:transition-none motion-reduce:group-hover/play:scale-100 motion-reduce:group-active/play:scale-100 md:size-20">
                  <HugeiconsIcon
                    icon={PlayIcon}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="size-7 translate-x-0.5 fill-current md:size-8"
                  />
                </span>
              </span>
            </a>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <h3 className="font-heading text-subtitle">{selected.title}</h3>
          <a
            href={selected.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hit-area inline-flex items-center gap-1 link-draw text-sm font-medium underline decoration-border underline-offset-4 focus-ring [--link-draw-y:calc(100%-0.1875rem)]"
          >
            Open on YouTube
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              strokeWidth={2}
              aria-hidden="true"
              className="size-4"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <ul className="grid divide-y overflow-clip rounded-xl border bg-card lg:col-span-5 lg:auto-rows-fr">
        {items.map((item) => {
          const isSelected = item.id === selected.id
          return (
            <li key={item.id} className="flex">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-current={isSelected ? "true" : undefined}
                onClick={(event) => {
                  if (!isPlainClick(event)) return
                  event.preventDefault()
                  setSelectedId(item.id)
                  setPlaying(false)
                }}
                className={cn(
                  "flex min-h-16 flex-1 items-center gap-4 px-4 py-3 focus-ring focus-visible:-outline-offset-2",
                  "hover:bg-muted active:bg-accent",
                  "motion-safe:transition-[scale] motion-safe:duration-(--dur-base) motion-safe:ease-(--ease-settle) motion-safe:active:scale-[0.985] motion-safe:active:duration-(--dur-press)",
                  isSelected &&
                    "bg-[color-mix(in_oklch,var(--flame)_18%,var(--card))] hover:bg-[color-mix(in_oklch,var(--flame)_18%,var(--card))]",
                )}
              >
                <span
                  className={cn(
                    "relative aspect-video w-18 shrink-0 overflow-clip rounded-md bg-muted",
                    isSelected &&
                      "ring-2 ring-ring ring-offset-2 ring-offset-card",
                  )}
                >
                  <Image
                    src={item.thumbnail.src}
                    alt={item.thumbnail.alt}
                    fill
                    sizes="4.5rem"
                    className="object-cover"
                  />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-heading text-subtitle">
                    {item.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {isSelected ? "Now showing" : item.meta}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { LessonPlayer }
