CREATE TABLE IF NOT EXISTS task (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_by text,
    title text,
    summary text,
    tags text[]
);

INSERT INTO task (created_by, title, summary, tags)
VALUES 
    (
        'John Doe',
        'Implement a new endpoint in the ODS API',
        'This task involves writing some typespec and some database querying!',
        ARRAY['C#', '.NET', 'SQL']
    ),
    (
        'Jane Doe',
        'Sort out Jane''s stuff so she can start development',
        'Involves setting up local environment on the teriyaki project.',
        ARRAY['Next.js', 'Docker', 'Windows']
    ),
    (
        'Rob Smith',
        'Display a warning message when viewing performance/valuation history of a new portfolio/account',
        'You''re welcome to pair up with me on this task which involves some front-end work.',
        ARRAY['Next.js', 'TypeScript']
    );