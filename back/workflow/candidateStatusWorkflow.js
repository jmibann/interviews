const NEW = "NEW";
const TECH_INTERVIEW = "TECH_INTERVIEW";
const REJECTED_TECH_INTERVIEW = "REJECTED_TECH_INTERVIEW";
const APPROVED_TECH_INTERVIEW = "APPROVED_TECH_INTERVIEW";
const FINAL_INTERVIEW = "FINAL_INTERVIEW";
const REJECTED_FINAL_INTERVIEW = "REJECTED_FINAL_INTERVIEW";
const APPROVED_FINAL_INTERVIEW = "APPROVED_FINAL_INTERVIEW";
const NO_NEXT = null;
const RECENTLY_CREATED = null;

class StatusNode {
    constructor() {
        this.status = new Map();
    }

    getStatus() {
        return this.status;
    }

    addStatus(status, isAdmin) {
        if (!isAdmin && (status === NEW || status === REJECTED_FINAL_INTERVIEW || status === APPROVED_FINAL_INTERVIEW)) return "ADMIN PRIVILEGE REQUIRED";

        switch (status) {
            case NEW:
                this.status.set(NEW, { prev: null, next: TECH_INTERVIEW });
                return this.status.keys().next().value;

            case TECH_INTERVIEW:
                this.status.set(TECH_INTERVIEW, {
                    prev: NEW,
                    next: { success: FINAL_INTERVIEW, fail: REJECTED_TECH_INTERVIEW }
                });
                return this.status.keys().next().value;

            case REJECTED_TECH_INTERVIEW:
                this.status.set(REJECTED_TECH_INTERVIEW, {
                    prev: TECH_INTERVIEW,
                    next: NO_NEXT
                });
                return this.status.keys().next().value;

            case FINAL_INTERVIEW:
                this.status.set(FINAL_INTERVIEW, {
                    prev: TECH_INTERVIEW,
                    next: {
                        success: APPROVED_FINAL_INTERVIEW,
                        fail: REJECTED_FINAL_INTERVIEW
                    }
                });
                return this.status.keys().next().value;

            case REJECTED_FINAL_INTERVIEW:
                this.status.set(REJECTED_FINAL_INTERVIEW, {
                    prev: FINAL_INTERVIEW,
                    next: NO_NEXT
                });
                return this.status.keys().next().value;

            case APPROVED_FINAL_INTERVIEW:
                this.status.set(APPROVED_FINAL_INTERVIEW, {
                    prev: FINAL_INTERVIEW,
                    next: NO_NEXT
                });
                return this.status.keys().next().value;

            default:
                return { error: true, msg: "STATUS NOT DEFINED" };
        }
    }

    checkNonAdminPermissions(currentState) {
        if (currentState === RECENTLY_CREATED || currentState === NEW || currentState === REJECTED_FINAL_INTERVIEW || currentState === APPROVED_FINAL_INTERVIEW) {
            return true;
        } else {
            return false;
        }
    };


    nextStatus(isAdmin, interviewResult) {
        const currentState = this.status.keys().next().value;

        if (!isAdmin && this.checkNonAdminPermissions(currentState)) return { error: true, msg: "ADMIN PRIVILEGE REQUIRED" };



        switch (this.status.keys().next().value) {
            case RECENTLY_CREATED:
                this.addStatus(NEW, isAdmin);
                return { error: false, status: this.status };

            case NEW:
                this.addStatus(this.status.get(NEW).next, isAdmin);
                this.status.delete(NEW);
                return { error: false, status: this.status.keys().next().value };

            case TECH_INTERVIEW:
                switch (interviewResult) {
                    case REJECTED_TECH_INTERVIEW:
                        this.addStatus(this.status.get(TECH_INTERVIEW).next.fail, isAdmin);
                        this.status.delete(TECH_INTERVIEW);
                        return { error: false, status: this.status.keys().next().value };

                    case APPROVED_TECH_INTERVIEW:
                        this.addStatus(this.status.get(TECH_INTERVIEW).next.success, isAdmin);
                        this.status.delete(TECH_INTERVIEW);
                        return { error: false, status: this.status.keys().next().value };

                    default:
                        return { error: true, msg: interviewResult + " INTERVIEW RESULT NOT DEFINED" };
                }

            case FINAL_INTERVIEW:
                switch (interviewResult) {
                    case REJECTED_FINAL_INTERVIEW:
                        this.addStatus(this.status.get(FINAL_INTERVIEW).next.fail, isAdmin);
                        this.status.delete(FINAL_INTERVIEW);
                        return { error: false, status: this.status.keys().next().value };

                    case APPROVED_FINAL_INTERVIEW:
                        this.addStatus(this.status.get(FINAL_INTERVIEW).next.success, isAdmin);
                        this.status.delete(FINAL_INTERVIEW);
                        return { error: false, status: this.status.keys().next().value };

                    case REJECTED_TECH_INTERVIEW:
                        this.addStatus(this.status.get(FINAL_INTERVIEW).prev, isAdmin);
                        this.addStatus(this.status.get(TECH_INTERVIEW).next.fail, isAdmin);
                        this.status.delete(TECH_INTERVIEW);
                        this.status.delete(FINAL_INTERVIEW);

                        return { error: false, status: this.status.keys().next().value };

                    default:
                        return {
                            error: true,
                            msg: interviewResult + " INTERVIEW RESULT NOT DEFINED"
                        };
                }

            case REJECTED_TECH_INTERVIEW:
                switch (interviewResult) {
                    case APPROVED_TECH_INTERVIEW:
                        this.addStatus(this.status.get(REJECTED_TECH_INTERVIEW).prev, isAdmin);
                        this.addStatus(this.status.get(TECH_INTERVIEW).next.success, isAdmin);
                        this.status.delete(REJECTED_TECH_INTERVIEW);
                        this.status.delete(TECH_INTERVIEW);
                        return { error: false, status: this.status.keys().next().value };

                    case REJECTED_TECH_INTERVIEW:
                        return { error: true, msg: "TECH INTERVIEW REJECTED - ALREADY REJECTED" };

                    default:
                        return { error: true, msg: interviewResult + " INTERVIEW RESULT NOT DEFINED OR PERMISSION DENIED" };
                }

            case REJECTED_FINAL_INTERVIEW:
                switch (interviewResult) {
                    case APPROVED_FINAL_INTERVIEW:
                        this.addStatus(this.status.get(REJECTED_FINAL_INTERVIEW).prev, isAdmin);
                        this.addStatus(this.status.get(FINAL_INTERVIEW).next.success, isAdmin);
                        this.status.delete(FINAL_INTERVIEW);
                        this.status.delete(REJECTED_FINAL_INTERVIEW);
                        return { error: false, status: this.status.keys().next().value };

                    case REJECTED_FINAL_INTERVIEW:
                        return { error: true, msg: "FINAL INTERVIEW REJECTED - ALREADY REJECTED" };

                    default:
                        return { error: true, msg: interviewResult + " INTERVIEW RESULT NOT DEFINED" };
                }


            case APPROVED_FINAL_INTERVIEW:
                switch (interviewResult) {

                    case APPROVED_FINAL_INTERVIEW:
                        return { error: true, msg: "FINAL INTERVIEW APPROVED - COMPLETED PROCESS" };

                        // case REJECTED_FINAL_INTERVIEW:
                        //     this.addStatus(this.status.get(REJECTED_FINAL_INTERVIEW).prev, isAdmin);
                        //     this.addStatus(this.status.get(FINAL_INTERVIEW).next, isAdmin);
                        //     this.status.delete(FINAL_INTERVIEW);
                        //     return { error: false, status: this.status.keys().next().value };

                }
            default:
                return { error: true, msg: "STATUS NOT DEFINED" };
        }
    }
}

module.exports = StatusNode;