<?php

namespace App\Http\Controllers\Traits;

use App\Models\Semester;
use Carbon\Carbon;

trait HasSemesterCodeValidation
{
    public function validateSemesterCode(string $code): array
    {
        if (!preg_match('/^(\d{2})(\d{2})(ODD|EVEN)$/', $code, $matches)) {
            return $this->invalidResult();
        }

        [$_, $from, $to, $semText] = $matches;
        $fullFrom = 2000 + intval($from);
        $fullTo = 2000 + intval($to);

        if ($fullTo !== $fullFrom + 1) {
            return $this->invalidResult();
        }

        $semesterNumber = $semText === 'ODD' ? 1 : 2;

        $result = [
            'valid' => true,
            'year' => $fullFrom,
            'semester' => $semesterNumber,
            'from' => $fullFrom,
            'to' => $fullTo,
            'current' => false,
            'upcoming' => false,
            'past' => false,
            'semesters_old' => null,
            'in_db' => false,
            'ppt_file' => null,
        ];

        $semester = Semester::where('semester_name', $code)
            ->orWhere(function ($query) use ($fullFrom, $semesterNumber) {
                $query->where('year', $fullFrom)
                    ->where('semester', $semesterNumber);
            })
            ->first();

        if (!$semester) {
            return $result;
        }
        $result['in_db'] = true;
        $result['semester_id'] = $semester->id;
        $result['ppt_file'] = $semester->ppt_file;
        $now = Carbon::now();
        $start = $semester->start_date ? Carbon::parse($semester->start_date) : null;
        $end = $semester->end_date ? Carbon::parse($semester->end_date) : null;

        if ($start && $end) {
            if ($now->between($start, $end)) {
                $result['current'] = true;
            } elseif ($now->lt($start)) {
                $result['upcoming'] = true;
            } elseif ($now->gt($end)) {
                $result['past'] = true;
            }
        } elseif ($start && $now->lt($start)) {
            $result['upcoming'] = true;
        } elseif ($end && $now->gt($end)) {
            $result['past'] = true;
        }

        if ($result['past']) {
            $latest = Semester::orderByDesc('year')
                ->orderByDesc('semester')
                ->first();

            if ($latest && $latest->id !== $semester->id) {
                $result['semesters_old'] = $this->calculateSemesterGap($latest, $semester);
            }
        }

        return $result;
    }

    protected function calculateSemesterGap(Semester $latest, Semester $given): int
    {
        $yearDiff = $latest->year - $given->year;
        $semDiff = $latest->semester - $given->semester;
        return $yearDiff * 2 + $semDiff;
    }

    protected function invalidResult(): array
    {
        return [
            'valid' => false,
            'year' => null,
            'semester' => null,
            'from' => null,
            'to' => null,
            'current' => false,
            'upcoming' => false,
            'past' => false,
            'semesters_old' => null,
        ];
    }
}
