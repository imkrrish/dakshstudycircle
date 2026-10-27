import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/layout/section-heading"
import { ActionButton } from "@/components/shared/action-button"
import type { SectionOf } from "@/lib/content-schema"
import { LessonPlayer } from "./lesson-player"

// A lesson player with a playlist list. Only LessonPlayer is a client island;
// the heading and actions stay on the server.
function VideoPlayerSection({
  section,
}: {
  section: SectionOf<"video-player">
}) {
  const { id, eyebrow, heading, intro, tone, items, defaultVideo, actions } =
    section

  return (
    <Section
      data-slot="video-player-section"
      id={id}
      tone={tone}
      aria-labelledby={`${id}-heading`}
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={heading}
          intro={intro}
        />
        <LessonPlayer items={items} defaultVideo={defaultVideo} />
        {actions && actions.length > 0 && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {actions.map((button) => (
              <ActionButton
                key={button.label}
                button={button}
                size="lg"
                className="h-11 w-full sm:h-10 sm:w-auto"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}

export { VideoPlayerSection }
