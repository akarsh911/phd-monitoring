@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <h2 class="mb-4">Assign Supervisor / Doctoral Committee</h2>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @elseif(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <div class="row">
        {{-- Supervisor Assignment --}}
        <div class="col-md-6 mb-4">
            <div class="card shadow-sm p-4">
                <h4 class="mb-3">Assign Supervisor</h4>
                <form method="POST" action="{{ url('/admin/allot-supervisor') }}">
                    @csrf
                    <div class="form-group mb-3">
                        <label for="student_id_supervisor">Student ID</label>
                        <input type="number" name="student_id" id="student_id_supervisor" class="form-control" required>
                    
                    </div>

                    <div class="form-group mb-3">
                        <label for="faculty_id_supervisor">Faculty ID</label>
                        <input type="number" name="faculty_id" id="faculty_id_supervisor" class="form-control" required>
                     
                    </div>

                    <button type="submit" class="btn btn-primary">Assign Supervisor</button>
                </form>
            </div>
        </div>

        {{-- Doctoral Committee Assignment --}}
        <div class="col-md-6 mb-4">
            <div class="card shadow-sm p-4">
                <h4 class="mb-3">Assign Doctoral Committee Member</h4>
                <form method="POST" action="{{ url('/admin/allot-doctoral') }}">
                    @csrf
                    <div class="form-group mb-3">
                        <label for="student_id_doctoral">Student ID</label>
                        <input type="number" name="student_id" id="student_id_doctoral" class="form-control" required>
                     
                    </div>

                    <div class="form-group mb-3">
                        <label for="faculty_id_doctoral">Faculty ID</label>
                        <input type="number" name="faculty_id" id="faculty_id_doctoral" class="form-control" required>
                     
                    </div>

                    <button type="submit" class="btn btn-secondary">Assign Doctoral</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
